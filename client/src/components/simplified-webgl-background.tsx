import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Animated floating sphere
const AnimatedSphere = ({ 
  position = [0, 0, 0] as [number, number, number], 
  color = '#20DF7F', 
  radius = 1, 
  speed = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const t = clock.getElapsedTime();
    
    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.5;
    
    // Rotation animation
    meshRef.current.rotation.x = t * 0.2 * speed;
    meshRef.current.rotation.z = t * 0.3 * speed;
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.4}
        roughness={0.2}
        envMapIntensity={1}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
};

// Grid of particles
const ParticleField = ({ count = 300 }: { count?: number }) => {
  const points = useRef<THREE.Points>(null);
  
  // Create particles on first render
  const particlePositions = useRef<Float32Array>();
  
  if (!particlePositions.current) {
    particlePositions.current = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      particlePositions.current[i3] = (Math.random() - 0.5) * 30;
      particlePositions.current[i3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions.current[i3 + 2] = (Math.random() - 0.5) * 30;
    }
  }
  
  // Animate particles
  useFrame(({ clock }) => {
    if (!points.current) return;
    
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Apply sine wave motion to each particle
      positions[i3 + 1] += Math.sin(time * 0.5 + i * 0.1) * 0.01;
      
      // Slowly rotate particles
      const x = positions[i3];
      const z = positions[i3 + 2];
      const angle = 0.0005;
      positions[i3] = x * Math.cos(angle) - z * Math.sin(angle);
      positions[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlePositions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        color="#20DF7F" 
        sizeAttenuation 
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
};

// Main scene containing all 3D elements
const Scene = () => {
  const isMobile = useIsMobile();
  const [spheres] = useState(() => {
    // Create array of sphere properties
    const count = isMobile ? 8 : 15;
    return Array.from({ length: count }, (_, i) => {
      const radius = 0.3 + Math.random() * 0.7;
      const position: [number, number, number] = [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5,
      ];
      // Gradient shades of green
      const hue = 120 + Math.random() * 60; // 120-180 (green to cyan)
      const saturation = 60 + Math.random() * 30; // 60-90%
      const lightness = 40 + Math.random() * 20; // 40-60%
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      const speed = 0.3 + Math.random() * 0.7;
      
      return { position, color, radius, speed };
    });
  });
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
      
      {/* Particles */}
      <ParticleField count={isMobile ? 150 : 300} />
      
      {/* Floating spheres */}
      {spheres.map((props, i) => (
        <AnimatedSphere key={i} {...props} />
      ))}
      
      {/* Subtle camera controls */}
      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

// Main component that is exported
const WebGLBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background to-background/80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default WebGLBackground;