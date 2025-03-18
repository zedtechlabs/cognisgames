import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';

// Simple floating sphere component
const FloatingSphere = ({ position, color, size }: { 
  position: [number, number, number], 
  color: string, 
  size: number 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Simple floating animation
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
    
    // Gentle rotation
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.z = time * 0.15;
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.4}
        roughness={0.7}
      />
    </mesh>
  );
};

// Particle cloud component
const ParticleCloud = ({ count = 100 }: { count?: number }) => {
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const pointsRef = useRef<THREE.Points>(null);
  
  // Initialize positions
  useEffect(() => {
    const posArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3] = (Math.random() - 0.5) * 20;      // x
      posArray[i3 + 1] = (Math.random() - 0.5) * 20;  // y
      posArray[i3 + 2] = (Math.random() - 0.5) * 10;  // z
    }
    setPositions(posArray);
  }, [count]);
  
  // Animate particles
  useFrame(({ clock }) => {
    if (!pointsRef.current || !positions) return;
    
    const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Gentle wave motion
      positionArray[i3 + 1] += Math.sin(time * 0.2 + i * 0.05) * 0.01;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  if (!positions) return null;
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        color="#20DF7F" 
        transparent 
        opacity={0.6} 
      />
    </points>
  );
};

// Main scene component
const Scene = () => {
  const isMobile = useIsMobile();
  const [spheres] = useState(() => {
    // Generate spheres with random properties
    const count = isMobile ? 5 : 10;
    const items = [];
    
    for (let i = 0; i < count; i++) {
      const position: [number, number, number] = [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 5
      ];
      
      // Green to cyan color range
      const hue = 120 + Math.random() * 60;
      const saturation = 60 + Math.random() * 30;
      const lightness = 40 + Math.random() * 20;
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      const size = 0.3 + Math.random() * 0.7;
      
      items.push({ position, color, size });
    }
    
    return items;
  });
  
  return (
    <>
      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      {/* Particle system */}
      <ParticleCloud count={isMobile ? 80 : 150} />
      
      {/* Floating spheres */}
      {spheres.map((sphere, i) => (
        <FloatingSphere 
          key={i} 
          position={sphere.position} 
          color={sphere.color} 
          size={sphere.size} 
        />
      ))}
    </>
  );
};

// Main component
const BasicWebGLBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background to-background/80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default BasicWebGLBackground;