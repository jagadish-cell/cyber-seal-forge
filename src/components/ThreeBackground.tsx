import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const FuturisticSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const glowSphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.002;
    }
    if (glowSphereRef.current) {
      glowSphereRef.current.rotation.y -= 0.001;
    }
  });

  return (
    <>
      {/* Main wireframe sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#00ffff" wireframe />
      </mesh>

      {/* Glow effect sphere */}
      <mesh ref={glowSphereRef}>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </>
  );
};

const ParticleSystem = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 300;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0008;
      particlesRef.current.rotation.x += 0.0004;
    }
  });

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
        color="#00ffff"
        size={0.05}
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
        style={{ background: 'radial-gradient(circle at center, #0d0d0d, #000000)' }}
      >
        {/* Lighting */}
        <ambientLight color="#00ffff" intensity={0.4} />
        <pointLight position={[5, 5, 5]} color="#00ffff" intensity={1} />

        {/* 3D Objects */}
        <FuturisticSphere />
        <ParticleSystem />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;