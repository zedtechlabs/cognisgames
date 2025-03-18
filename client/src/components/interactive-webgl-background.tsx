import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  useTexture, 
  Sphere, 
  Box, 
  MeshDistortMaterial, 
  MeshWobbleMaterial, 
  shaderMaterial,
  useCursor
} from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Create and extend THREE.ShaderMaterial for type compatibility
const GridMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color("#20DF7F"),
    resolution: new THREE.Vector2(1024, 1024),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color;
    uniform vec2 resolution;
    varying vec2 vUv;
    
    float grid(vec2 uv, float size) {
      vec2 p = uv * resolution / size;
      vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p);
      float line = min(grid.x, grid.y);
      return 1.0 - min(line, 1.0);
    }
    
    void main() {
      // Create a base grid
      float g = grid(vUv, 30.0);
      
      // Add a second grid with animation
      vec2 uv2 = vUv;
      uv2.y += sin(uv2.x * 5.0 + time) * 0.05;
      float g2 = grid(uv2, 60.0);
      
      // Combine grids
      float gridValue = g * 0.5 + g2 * 0.3;
      
      // Fade edges
      float fadeEdges = pow(1.0 - length(vUv - 0.5) * 1.1, 2.0);
      fadeEdges = clamp(fadeEdges, 0.0, 1.0);
      
      // Apply color
      vec3 finalColor = color * gridValue * fadeEdges;
      
      // Apply glow
      finalColor += color * 0.1 * fadeEdges;
      
      gl_FragColor = vec4(finalColor, gridValue * fadeEdges);
    }
  `
);

// Register the shader material with proper typing
const Grid = ({ 
  position = [0, 0, -20] as [number, number, number], 
  rotation = [0, 0, 0] as [number, number, number] 
}) => {
  const materialRef = useRef<any>();
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime();
    }
  });
  
  return (
    <mesh position={position} rotation={rotation} scale={[40, 40, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <gridMaterial ref={materialRef} transparent />
    </mesh>
  );
};

// Interactive floating objects
const FloatingObject = ({ position = [0, 0, 0], size = 1, color = "#20DF7F", speed = 1, onClick }) => {
  const meshRef = useRef<THREE.Mesh>();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  useCursor(hovered);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const t = clock.getElapsedTime();
    
    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.3;
    
    // Rotation
    meshRef.current.rotation.x = t * 0.1 * speed;
    meshRef.current.rotation.z = t * 0.15 * speed;
    
    // Scale animation on hover
    if (hovered) {
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.2, 0.1);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.2, 0.1);
    } else {
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
    }
  });
  
  // Randomly choose between a box and a sphere
  const isBox = Math.random() > 0.5;
  
  return (
    <group position={position}>
      {isBox ? (
        <Box 
          ref={meshRef} 
          args={[size, size, size]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => {
            setActive(!active);
            onClick();
          }}
        >
          <MeshWobbleMaterial 
            color={color} 
            factor={0.4} 
            speed={speed * 0.5}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </Box>
      ) : (
        <Sphere 
          ref={meshRef} 
          args={[size * 0.7, 16, 16]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => {
            setActive(!active);
            onClick();
          }}
        >
          <MeshDistortMaterial 
            color={color} 
            distort={active ? 0.8 : 0.4} 
            speed={speed * 0.5}
            metalness={0.5}
            roughness={0.3}
            transparent
            opacity={0.9}
          />
        </Sphere>
      )}
    </group>
  );
};

// Reactive particle system
const ParticleSystem = ({ count = 200, onInteraction }) => {
  const meshRef = useRef<THREE.Points>();
  const pointerRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  
  // Custom attributes for points
  const [positions, setPositions] = useState<Float32Array>(new Float32Array());
  const [sizes, setSizes] = useState<Float32Array>(new Float32Array());
  const [directions, setDirections] = useState<Float32Array>(new Float32Array());
  
  // Setup particles
  useEffect(() => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const dirs = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Position in a sphere
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 8;
      const height = (Math.random() - 0.5) * 10;
      
      pos[i * 3] = Math.cos(angle) * radius;     // x
      pos[i * 3 + 1] = height;                   // y
      pos[i * 3 + 2] = Math.sin(angle) * radius; // z
      
      // Random size
      sizes[i] = 0.05 + Math.random() * 0.15;
      
      // Direction for animation
      dirs[i * 3] = (Math.random() - 0.5) * 0.01;
      dirs[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      dirs[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    setPositions(pos);
    setSizes(sizes);
    setDirections(dirs);
  }, [count]);
  
  // Mouse interaction
  const { camera } = useThree();
  
  useFrame(({ clock, mouse, viewport }) => {
    if (!meshRef.current) return;
    
    // Update pointer position for interaction
    const vector = new THREE.Vector3(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0
    );
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    pointerRef.current = camera.position.clone().add(dir.multiplyScalar(distance));
    
    // Update particles
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Current position
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      // Distance to pointer
      const dx = x - pointerRef.current.x;
      const dy = y - pointerRef.current.y;
      const dz = z - pointerRef.current.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      // Apply forces
      if (dist < 3) {
        // Push particles away from pointer
        const force = (1 - dist / 3) * 0.02;
        positions[i3] += dx * force;
        positions[i3 + 1] += dy * force;
        positions[i3 + 2] += dz * force;
        
        // Trigger interaction callback
        if (dist < 1 && Math.random() > 0.99) {
          onInteraction();
        }
      }
      
      // Apply directions for continuous motion
      positions[i3] += Math.sin(time * 0.5 + i) * directions[i3] * 0.5;
      positions[i3 + 1] += Math.cos(time * 0.5 + i) * directions[i3 + 1] * 0.5;
      positions[i3 + 2] += Math.sin(time * 0.3 + i) * directions[i3 + 2] * 0.5;
      
      // Boundary check - wrap around
      const limit = 10;
      if (positions[i3] < -limit) positions[i3] = limit;
      if (positions[i3] > limit) positions[i3] = -limit;
      if (positions[i3 + 1] < -limit) positions[i3 + 1] = limit;
      if (positions[i3 + 1] > limit) positions[i3 + 1] = -limit;
      if (positions[i3 + 2] < -limit) positions[i3 + 2] = limit;
      if (positions[i3 + 2] > limit) positions[i3 + 2] = -limit;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return positions.length ? (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation={true}
        color="#20DF7F"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  ) : null;
};

// Main scene with all 3D elements
const Scene = ({ onInteraction }) => {
  const isMobile = useIsMobile();
  const [interactiveObjects, setInteractiveObjects] = useState<any[]>([]);
  
  useEffect(() => {
    // Create objects at random positions
    const objectCount = isMobile ? 8 : 15;
    const objects = [];
    
    for (let i = 0; i < objectCount; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8 - 2;
      
      // Random color in green/blue spectrum
      const hue = 120 + Math.random() * 60; // 120-180 (green to cyan)
      const saturation = 50 + Math.random() * 40; // 50-90%
      const lightness = 40 + Math.random() * 20; // 40-60%
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      objects.push({
        id: i,
        position: [x, y, z],
        size: 0.3 + Math.random() * 0.7,
        color,
        speed: 0.2 + Math.random() * 0.8
      });
    }
    
    setInteractiveObjects(objects);
  }, [isMobile]);
  
  return (
    <>
      {/* Register the custom shader */}
      <gridMaterial attach="material" />
      
      {/* Main lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
      <spotLight position={[-10, 10, 5]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
      
      {/* Grid background */}
      <Grid />
      
      {/* Interactive floating objects */}
      {interactiveObjects.map((obj) => (
        <FloatingObject
          key={obj.id}
          position={obj.position}
          size={obj.size}
          color={obj.color}
          speed={obj.speed}
          onClick={onInteraction}
        />
      ))}
      
      {/* Particle system */}
      <ParticleSystem
        count={isMobile ? 100 : 200}
        onInteraction={onInteraction}
      />
      
      {/* Camera controls (limited for production) */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        rotateSpeed={0.2}
        autoRotate
        autoRotateSpeed={0.1}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

// Sound effect for interactions
const useSoundEffect = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  
  useEffect(() => {
    // Create audio context on user interaction (required by browsers)
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);
    
    return () => {
      if (context) {
        context.close();
      }
    };
  }, []);
  
  const playInteractionSound = () => {
    if (!audioContext) return;
    
    // Create a simple oscillator for a "blip" sound
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    // Configure sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400 + Math.random() * 200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
    
    // Configure volume envelope
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    
    // Play sound
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };
  
  return { playInteractionSound };
};

// The main component exported and used in the app
const InteractiveWebGLBackground = () => {
  const { playInteractionSound } = useSoundEffect();
  const [interactionCount, setInteractionCount] = useState(0);
  
  const handleInteraction = () => {
    playInteractionSound();
    setInteractionCount(prev => prev + 1);
  };
  
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background to-background/90 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }} dpr={[1, 2]}>
        <Scene onInteraction={handleInteraction} />
      </Canvas>
      
      {/* Optional: Show interaction counter */}
      {interactionCount > 0 && (
        <div className="absolute bottom-4 right-4 text-primary/80 font-mono text-sm">
          Interactions: {interactionCount}
        </div>
      )}
    </div>
  );
};

export default InteractiveWebGLBackground;