"use client";

import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';

export const CoffeeBagModel = ({ 
    color = "#2C1810", 
    finish = "matte", 
    labelTexture = null, 
    labelScale = 1, 
    labelY = 0,
    ...props 
}: any) => {
  const meshRef = useRef<any>(null);
  
  // Create texture from URL if provided
  const texture = labelTexture ? new THREE.TextureLoader().load(labelTexture) : null;

  return (
    <group {...props} ref={meshRef} position={[0, -1.5, 0]}>
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
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>

      {/* Label Area (Front) */}
      <mesh position={[0, 1.5 + labelY, 0.51]} scale={[labelScale, labelScale, 1]}>
        <planeGeometry args={[1.5, 2]} />
        {texture ? (
            <meshBasicMaterial map={texture} transparent />
        ) : (
            <meshStandardMaterial color="#FFF" roughness={0.5} />
        )}
      </mesh>
    </group>
  );
};
