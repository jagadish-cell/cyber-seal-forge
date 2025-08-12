import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Mail } from 'lucide-react';

// Performance optimization based on device capabilities
const getDeviceSettings = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isLowEnd = typeof navigator !== 'undefined' && 
    (navigator.hardwareConcurrency <= 4 || 
     (navigator as any).deviceMemory <= 4);
  
  return {
    particleCount: isMobile ? 80 : isLowEnd ? 200 : 400,
    sphereDetail: isMobile ? 32 : 64,
    enablePostprocessing: !isMobile && !isLowEnd,
    bloomIntensity: isMobile ? 0.5 : 1.0
  };
};

// Rotating wireframe sphere with glow
const CentralSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const settings = getDeviceSettings();

  useFrame((state) => {
    if (meshRef.current && wireframeRef.current) {
      // Smooth rotation
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.001;
      wireframeRef.current.rotation.y -= 0.002;
      wireframeRef.current.rotation.x += 0.0005;

      // Subtle scale breathing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const wireframeGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1.2, settings.sphereDetail, settings.sphereDetail);
    return new THREE.WireframeGeometry(geometry);
  }, [settings.sphereDetail]);

  useEffect(() => {
    if (meshRef.current && wireframeRef.current) {
      // Initial animation
      gsap.from(meshRef.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 2,
        ease: "back.out(1.7)",
        delay: 1
      });
      gsap.from(wireframeRef.current.material, {
        opacity: 0,
        duration: 1.5,
        delay: 1.2
      });
    }
  }, []);

  return (
    <group>
      {/* Core glowing sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, settings.sphereDetail, settings.sphereDetail]} />
        <meshStandardMaterial
          color="#001122"
          emissive="#00ffff"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Wireframe overlay */}
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial 
          color="#00ffff" 
          transparent 
          opacity={0.8}
          linewidth={2}
        />
      </lineSegments>

      {/* Halo ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.8, 64]} />
        <meshBasicMaterial
          color="#8a2be2"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Interactive particle field
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();
  const settings = getDeviceSettings();

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(settings.particleCount * 3);
    const vel = new Float32Array(settings.particleCount * 3);
    
    for (let i = 0; i < settings.particleCount; i++) {
      // Spherical distribution
      const radius = 5 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      // Random drift velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return { positions: pos, velocities: vel };
  }, [settings.particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < settings.particleCount; i++) {
        const i3 = i * 3;
        
        // Drift motion
        positions[i3] += velocities[i3] + Math.sin(time * 0.3 + i) * 0.002;
        positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.4 + i) * 0.002;
        positions[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.2 + i) * 0.001;

        // Mouse repulsion
        const dx = positions[i3] - mouseRef.current.x * 10;
        const dy = positions[i3 + 1] - mouseRef.current.y * 10;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 3) {
          const force = (3 - distance) / 3;
          positions[i3] += dx * force * 0.02;
          positions[i3 + 1] += dy * force * 0.02;
        }

        // Boundary constraints
        const maxDistance = 20;
        const currentDistance = Math.sqrt(
          positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2
        );
        
        if (currentDistance > maxDistance) {
          const factor = maxDistance / currentDistance;
          positions[i3] *= factor;
          positions[i3 + 1] *= factor;
          positions[i3 + 2] *= factor;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY / size.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  useEffect(() => {
    if (particlesRef.current) {
      gsap.from(particlesRef.current.material, {
        opacity: 0,
        duration: 2,
        delay: 1.5
      });
    }
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={settings.particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffff"
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.6}
        alphaTest={0.001}
      />
    </points>
  );
};

// Camera controller with smooth parallax
const CameraController = () => {
  const { camera, size } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Smooth parallax movement
    const targetX = mouseRef.current.x * 0.5;
    const targetY = mouseRef.current.y * 0.3;
    
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    // Initial dolly-in animation
    camera.position.set(0, 0, 20);
    gsap.to(camera.position, {
      z: 8,
      duration: 3,
      ease: "power2.out"
    });

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY / size.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera, size]);

  return null;
};

// 3D Scene component
const Scene3D = () => {
  const settings = getDeviceSettings();

  return (
    <>
      {/* Lighting setup */}
      <ambientLight color="#001a33" intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#00ffff" intensity={1.5} />
      <pointLight position={[-5, -5, -5]} color="#8a2be2" intensity={1} />
      <spotLight
        position={[0, 10, 0]}
        color="#ffffff"
        intensity={0.5}
        angle={Math.PI / 6}
        penumbra={1}
        castShadow
      />

      {/* Fog for depth */}
      <fog attach="fog" args={['#000000', 10, 50]} />

      {/* Camera controller */}
      <CameraController />

      {/* 3D objects */}
      <CentralSphere />
      <ParticleField />

      {/* Post-processing effects */}
      {settings.enablePostprocessing && (
        <EffectComposer>
          <Bloom
            intensity={settings.bloomIntensity}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={300}
          />
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.05}
            bokehScale={3}
          />
        </EffectComposer>
      )}
    </>
  );
};

// Text overlay component
const TextOverlay = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2 });
    
    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    })
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .from(buttonsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="text-center max-w-4xl px-6">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 pointer-events-auto"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ffff 50%, #8a2be2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
            letterSpacing: '-0.02em'
          }}
        >
          Bandi Naga Jagadish
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 leading-relaxed pointer-events-auto"
          style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}
        >
          Cybersecurity Expert & Full Stack Developer
          <br />
          <span className="text-lg md:text-xl text-cyan-300">
            Crafting secure digital experiences with cutting-edge technology
          </span>
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto">
          <Button
            onClick={() => scrollToSection('projects')}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 group"
          >
            View My Work
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              window.open(
                'https://drive.google.com/uc?export=download&id=1CLkiys2s1a0RzJ6TZI0x3QFy5dNDfDkm',
                '_blank'
              );
            }}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </Button>

          <Button
            onClick={() => scrollToSection('contact')}
            variant="ghost"
            size="lg"
            className="text-white hover:text-cyan-400 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-white/10"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Me
          </Button>
        </div>
      </div>
    </div>
  );
};

// Loading fallback
const LoadingFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
    <div className="text-cyan-400 text-xl animate-pulse">Loading...</div>
  </div>
);

// Main hero component
const FuturisticHero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ 
              antialias: true, 
              alpha: false,
              powerPreference: "high-performance"
            }}
            dpr={Math.min(window.devicePixelRatio, 2)}
          >
            <Scene3D />
          </Canvas>
        </Suspense>
      </div>

      {/* Text overlay */}
      <TextOverlay />

      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.4) 70%)'
        }}
      />
    </section>
  );
};

export default FuturisticHero;