"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

export const CoffeeBagModel = ({ color = "#2C1810", finish = "matte", ...props }: any) => {
  const meshRef = useRef<any>(null);

  useFrame((state, delta) => {
    // Gentle floating animation
    if (meshRef.current) {
        easing.damp3(meshRef.current.position, [0, Math.sin(state.clock.elapsedTime) * 0.1, 0], 0.25, delta);
        easing.dampE(meshRef.current.rotation, [0, state.pointer.x * 0.2, 0], 0.25, delta);
    }
  });

  return (
    <group {...props} ref={meshRef}>
      {/* Main Bag Body (Procedural shape with slightly rounded bottom) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 3.5, 1, 4, 4, 4]} /> {/* Segments for smoother lighting */}
        <meshStandardMaterial 
            color={color} 
            roughness={finish === 'matte' ? 0.9 : 0.3}
            metalness={finish === 'matte' ? 0.0 : 0.2}
        />
      </mesh>

      {/* Bag Top (Sealed Edge - Crimped) */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[2.1, 0.3, 0.15]} />
        <meshStandardMaterial 
            color={color}
            roughness={0.9}
        />
      </mesh>

      {/* Label Area (Front) */}
      <mesh position={[0, -0.2, 0.51]}>
        <planeGeometry args={[1.6, 2.2]} />
        <meshStandardMaterial color="#FFF" roughness={0.5} />
        {/* Placeholder Text as Texture would go here */}
      </mesh>
    </group>
  );
};
