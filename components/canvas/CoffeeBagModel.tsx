"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

export const CoffeeBagModel = ({ color = "#1a1a1a", finish = "matte", ...props }: any) => {
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
      {/* Main Bag Body (Box Geometry with bevels - Placeholder for GLTF) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 3.5, 1]} />
        <meshStandardMaterial 
            color={color} 
            roughness={finish === 'matte' ? 0.8 : 0.2}
            metalness={finish === 'matte' ? 0.1 : 0.4}
        />
      </mesh>

      {/* Bag Top (Sealed Edge) */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[2, 0.2, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Label Area (Front) */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[1.5, 2]} />
        <meshStandardMaterial color="#ffffff" />
        {/* Text Texture would go here */}
      </mesh>
    </group>
  );
};
