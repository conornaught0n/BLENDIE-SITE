"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

export const CoffeeBagModel = ({ color = "#2C1810", finish = "matte", ...props }: any) => {
  const meshRef = useRef<any>(null);

  // Removed floating animation to "Ground" the bag
  // useFrame((state, delta) => { ... })

  return (
    <group {...props} ref={meshRef} position={[0, -1.5, 0]}> {/* Lowered position to floor */}
      {/* Main Bag Body */}
      <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 3.5, 1, 4, 4, 4]} />
        <meshStandardMaterial 
            color={color} 
            roughness={finish === 'matte' ? 0.9 : 0.3}
            metalness={finish === 'matte' ? 0.0 : 0.2}
        />
      </mesh>

      {/* Bag Top (Sealed Edge) */}
      <mesh position={[0, 3.6, 0]} castShadow>
        <boxGeometry args={[2.1, 0.3, 0.15]} />
        <meshStandardMaterial 
            color={color}
            roughness={0.9}
        />
      </mesh>

      {/* Label Area (Front) */}
      <mesh position={[0, 1.5, 0.51]}>
        <planeGeometry args={[1.6, 2.2]} />
        <meshStandardMaterial color="#FFF" roughness={0.5} />
      </mesh>
    </group>
  );
};
