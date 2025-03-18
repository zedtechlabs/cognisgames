import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, GradientTexture } from '@react-three/drei';
import { Vector3, Color } from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Animated floating sphere
const AnimatedSphere = ({ position, size, speed, factor }: { 
  position: [number, number, number], 
  size: number, 
  speed: number, 
  factor: number 
}) => {
  const ref = useRef<any>();
  const initialPosition = useRef(new Vector3(...position));
  
  useFrame(({ clock }) => {
    if (!ref.current) return;
    
    // Floating animation
    const time = clock.getElapsedTime();
    const y = Math.sin(time * speed) * 0.3;
    
    ref.current.position.y = initialPosition.current.y + y;
    ref.current.rotation.x = time * 0.1;
    ref.current.rotation.z = time * 0.1;
  });
  
  return (
    <Sphere ref={ref} args={[size, 24, 24]} position={position}>
      <MeshDistortMaterial 
        color={new Color("#20DF7F").getHex()} 
        attach="material" 
        distort={factor} 
        speed={speed * 0.4} 
        transparent={true}
        opacity={0.8}
      >
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={['#20DF7F', '#0ba360', '#3cba92']}
          size={100}
        />
      </MeshDistortMaterial>
    </Sphere>
  );
};

// Animated grid of particles
const ParticleField = ({ count = 100, size = 0.02 }: { count?: number, size?: number }) => {
  const meshRef = useRef<any>();
  const [positions, setPositions] = useState<number[]>([]);

  useEffect(() => {
    const pos: number[] = [];
    for (let i = 0; i < count; i++) {
      // Random positions in a square grid
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      pos.push(x, y, z);
    }
    setPositions(pos);
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    // Subtle rotation of the entire particle field
    const time = clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.x = Math.sin(time) * 0.2;
    meshRef.current.rotation.y = Math.cos(time) * 0.2;
  });

  return positions.length > 0 ? (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={new Float32Array(positions)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation={true}
        color="#20DF7F"
        transparent
        opacity={0.6}
      />
    </points>
  ) : null;
};

// Main scene component that contains all 3D elements
const Scene = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      
      {/* Main sphere in the center */}
      <AnimatedSphere position={[0, 0, 0]} size={1.5} speed={0.2} factor={0.4} />
      
      {/* Smaller spheres around */}
      <AnimatedSphere position={[-3, 1, -3]} size={0.8} speed={0.3} factor={0.6} />
      <AnimatedSphere position={[3, -1, -2]} size={0.6} speed={0.4} factor={0.8} />
      <AnimatedSphere position={[2, 2, -4]} size={0.4} speed={0.5} factor={1} />
      
      {/* Particles in the background */}
      <ParticleField count={isMobile ? 50 : 100} size={isMobile ? 0.03 : 0.02} />
      
      {/* Camera controls (disabled for production) */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        rotateSpeed={0.2}
        autoRotate
        autoRotateSpeed={0.1}
      />
    </>
  );
};

// The main component exported and used in the app
const WebGLBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background to-background/80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default WebGLBackground;