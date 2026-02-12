import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Rotating Globe component
const Globe: React.FC = () => {
    const globeRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group>
            {/* Main Purple Sphere */}
            <mesh ref={globeRef}>
                <Sphere args={[1, 64, 64]}>
                    <MeshDistortMaterial
                        color="#7c3aed"
                        attach="material"
                        distort={0.3}
                        speed={1.5}
                        roughness={0.4}
                        metalness={0.8}
                    />
                </Sphere>
            </mesh>

            {/* Wireframe overlay - Restored */}
            <mesh rotation={[0, 0, 0]}>
                <sphereGeometry args={[1.01, 32, 32]} />
                <meshBasicMaterial
                    color="#06b6d4"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </mesh>
        </group>
    );
};

// Main Scene3D component
export const Scene3D: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 3], fov: 45 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

                <Globe />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
};
