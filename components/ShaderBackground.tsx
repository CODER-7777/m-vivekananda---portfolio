import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom shader material for liquid/fluid effect
const FluidShader: React.FC = () => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 uv = vUv;
      
      // Create flowing liquid effect
      float wave1 = sin(uv.x * 10.0 + uTime * 2.0) * 0.1;
      float wave2 = cos(uv.y * 10.0 - uTime * 1.5) * 0.1;
      
      // Mouse interaction
      float dist = distance(uv, uMouse);
      float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.5 + 0.5;
      ripple *= exp(-dist * 3.0);
      
      // Color blending
      vec3 color1 = vec3(0.486, 0.224, 0.929); // violet
      vec3 color2 = vec3(0.024, 0.714, 0.831); // cyan
      vec3 color3 = vec3(0.925, 0.271, 0.596); // pink
      
      float mixer = (wave1 + wave2 + ripple) * 0.5 + 0.5;
      vec3 finalColor = mix(color1, color2, mixer);
      finalColor = mix(finalColor, color3, ripple);
      
      gl_FragColor = vec4(finalColor, 0.3);
    }
  `;

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        }),
        []
    );

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh>
            <planeGeometry args={[10, 10, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

export const ShaderBackground: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1 - (e.clientY - rect.top) / rect.height;

        // Update shader uniforms via event
        const event = new CustomEvent('shader-mouse-move', {
            detail: { x, y },
        });
        window.dispatchEvent(event);
    };

    return (
        <div
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-20"
            onMouseMove={handleMouseMove}
            style={{ mixBlendMode: 'screen' }}
        >
            <Canvas camera={{ position: [0, 0, 5] }}>
                <FluidShader />
            </Canvas>
        </div>
    );
};
