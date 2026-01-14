"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FlavorTerrain = ({ attributes }: { attributes: any }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Generate Geometry based on flavor profile
  const geometry = useMemo(() => {
    // 5 Attributes map to peaks in the terrain
    const geo = new THREE.PlaneGeometry(4, 4, 32, 32);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Calculate height (z) based on flavor peaks
      // Bright (Top Right), Dark (Bottom Left), Fruity (Top Left), Sweet (Bottom Right), Body (Center)
      let z = 0;
      
      // Peak 1: Bright
      z += (attributes.bright / 10) * Math.exp(-((x - 1.5)**2 + (y - 1.5)**2));
      // Peak 2: Dark
      z += (attributes.dark / 10) * Math.exp(-((x + 1.5)**2 + (y + 1.5)**2));
      // Peak 3: Fruity
      z += (attributes.fruity / 10) * Math.exp(-((x + 1.5)**2 + (y - 1.5)**2));
      // Peak 4: Sweet
      z += (attributes.sweet / 10) * Math.exp(-((x - 1.5)**2 + (y + 1.5)**2));
      // Peak 5: Body (Global lift + center peak)
      z += (attributes.body / 15) * Math.exp(-(x**2 + y**2) * 0.5);

      pos.setZ(i, z * 1.5); // Scale height
    }
    
    geo.computeVertexNormals();
    return geo;
  }, [attributes]);

  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.rotation.z += 0.002; // Slow rotation
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        wireframe={false}
        roughness={0.3}
        metalness={0.1}
        vertexColors={false}
        color="#FFB703" // Base Citrus
        emissive="#540D6E" // Deep Plum Glow
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

export const FlavorTerrainCanvas = ({ attributes }: { attributes: any }) => {
  return (
    <div className="w-full h-full min-h-[300px] bg-gradient-to-b from-fruit-plum/10 to-transparent rounded-2xl overflow-hidden relative">
        <div className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest font-bold opacity-50">4D Profile Map</div>
        <Canvas camera={{ position: [0, 4, 4], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <FlavorTerrain attributes={attributes} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="sunset" />
        </Canvas>
    </div>
  );
};
