import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Glass-like inner sphere component
const InnerSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0018;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      // GSAP intro animation
      gsap.from(meshRef.current.material, {
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.25, 64, 64]} />
      <meshPhysicalMaterial
        color="#00192a"
        metalness={0.2}
        roughness={0.05}
        transmission={0.6}
        thickness={0.8}
        clearcoat={0.4}
        emissive="#002b33"
        emissiveIntensity={0.3}
        transparent
      />
    </mesh>
  );
};

// Bright core sphere
const CoreSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.0015;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.material, {
        opacity: 0,
        duration: 1.2,
        delay: 0.6,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color="#00f0ff"
        emissive="#00f0ff"
        emissiveIntensity={1.0}
        roughness={0.2}
        metalness={0.0}
        transparent
      />
    </mesh>
  );
};

// Wireframe shell
const WireframeSphere = () => {
  const meshRef = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.003;
    }
  });

  const wireframeGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1.4, 64, 64);
    return new THREE.WireframeGeometry(geometry);
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.material, {
        opacity: 0,
        duration: 1.4,
        delay: 0.7,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <lineSegments ref={meshRef} geometry={wireframeGeometry}>
      <lineBasicMaterial color="#00f0ff" transparent opacity={0.9} />
    </lineSegments>
  );
};

// Halo effect
const HaloSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
      meshRef.current.scale.setScalar(scale);
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.material, {
        opacity: 0,
        duration: 1.4,
        delay: 0.9,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.6, 32, 32]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.06} />
    </mesh>
  );
};

// Interactive particle system
const InteractiveParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const { size } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 720;
  const particleCount = isMobile ? 120 : 480;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.5 + Math.random() * 6.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      pos[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
      pos[i * 3 + 1] = Math.sin(phi) * r * 0.6;
      pos[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
    }
    return pos;
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      // Gentle rotation
      particlesRef.current.rotation.y += 0.0006;
      particlesRef.current.rotation.x += 0.00025;

      // Particle reaction to mouse
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const px = mouseRef.current.x * 6;
      const py = mouseRef.current.y * 3;
      
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        // Distance to cursor
        const dx = positions[ix] - px;
        const dy = positions[iy] - py;
        const d2 = dx * dx + dy * dy;
        
        // Small repulsion if close
        const influence = Math.max(0, 1 - d2 / 12);
        positions[ix] += (dx / (Math.sqrt(d2) + 0.001)) * 0.002 * influence;
        positions[iy] += (dy / (Math.sqrt(d2) + 0.001)) * 0.0015 * influence;
        
        // Subtle orbit motion
        positions[iz] += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.0008;
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
        duration: 1.6,
        delay: 0.8,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00f0ff"
        size={isMobile ? 0.045 : 0.06}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
};

// Camera controller with mouse parallax
const CameraController = () => {
  const { camera, size } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef(new THREE.Vector3(0, 0, 6));

  useFrame(() => {
    const lerpSpeed = 0.06;
    targetRef.current.x = mouseRef.current.x * 0.8;
    targetRef.current.y = mouseRef.current.y * 0.4;
    
    camera.position.x += (targetRef.current.x - camera.position.x) * lerpSpeed;
    camera.position.y += (targetRef.current.y - camera.position.y) * lerpSpeed;
    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    // Initial camera animation
    camera.position.z = 10;
    gsap.to(camera.position, { z: 6.0, duration: 1.8, ease: "power3.out" });

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY / size.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera, size]);

  return null;
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ 
          background: 'radial-gradient(1200px 800px at 10% 20%, rgba(9,12,25,0.65), transparent 10%), linear-gradient(180deg, #02020a, #071022)'
        }}
      >
        {/* Enhanced Lighting */}
        <ambientLight color="#66f7ff" intensity={0.12} />
        <pointLight position={[4, 4, 6]} color="#00f0ff" intensity={1.2} distance={20} />
        <pointLight position={[-4, -2, -3]} color="#8a2be2" intensity={0.6} distance={20} />

        {/* Scene setup */}
        <fog attach="fog" args={['#00000d', 10, 200]} />

        {/* Camera Controller */}
        <CameraController />

        {/* 3D Objects */}
        <InnerSphere />
        <CoreSphere />
        <WireframeSphere />
        <HaloSphere />
        <InteractiveParticles />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;