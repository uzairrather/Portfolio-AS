import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

function AnimatedSphere() {
  const meshRef = useRef()
  const innerRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2
      meshRef.current.rotation.y = t * 0.2
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.15
      innerRef.current.rotation.z = t * 0.1
    }
  })

  return (
    <>
      {/* Outer distorted sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[2.2, 64, 64]} />
          <MeshDistortMaterial
            color="#00ff87"
            attach="material"
            distort={0.35}
            speed={2}
            roughness={0}
            metalness={0.1}
            transparent
            opacity={0.08}
            wireframe={false}
          />
        </mesh>

        {/* Wireframe shell */}
        <mesh scale={1.05}>
          <sphereGeometry args={[2.2, 20, 20]} />
          <meshBasicMaterial
            color="#00ff87"
            wireframe
            transparent
            opacity={0.05}
          />
        </mesh>

        {/* Inner glowing core */}
        <mesh ref={innerRef} scale={0.6}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshDistortMaterial
            color="#0066ff"
            distort={0.5}
            speed={3}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Center glow */}
        <mesh scale={0.2}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      </Float>

      {/* Orbiting rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.015, 8, 100]} />
        <meshBasicMaterial color="#00ff87" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[4, 0.01, 8, 100]} />
        <meshBasicMaterial color="#0066ff" transparent opacity={0.1} />
      </mesh>
    </>
  )
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff87" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0066ff" />
        <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
        <AnimatedSphere />
      </Canvas>
    </div>
  )
}
