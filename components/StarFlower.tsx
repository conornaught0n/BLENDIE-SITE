"use client";

import React, { useState } from 'react';

interface StarFlowerProps {
  attributes?: {
    aroma: number;
    body: number;
    acidity: number;
    sweetness: number;
    aftertaste: number;
  };
}

export const StarFlower: React.FC<StarFlowerProps> = ({
  attributes = { aroma: 8, body: 7, acidity: 6, sweetness: 9, aftertaste: 8 }
}) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const center = 150;
  const radius = 100;
  
  const points = [
    { label: 'Aroma', value: attributes.aroma, angle: 0, color: '#7D4E57' }, // Purple
    { label: 'Body', value: attributes.body, angle: 72, color: '#5D4037' }, // Brown
    { label: 'Acidity', value: attributes.acidity, angle: 144, color: '#E6AA68' }, // Yellow
    { label: 'Sweetness', value: attributes.sweetness, angle: 216, color: '#C04E3F' }, // Red
    { label: 'Aftertaste', value: attributes.aftertaste, angle: 288, color: '#7D4E57' }, // Purple
  ];

  const getCoordinates = (value: number, angle: number) => {
    const angleRad = (angle - 90) * (Math.PI / 180);
    const r = (value / 10) * radius;
    const x = center + r * Math.cos(angleRad);
    const y = center + r * Math.sin(angleRad);
    return { x, y };
  };

  const polyPoints = points.map(p => {
    const { x, y } = getCoordinates(p.value, p.angle);
    return `${x},${y}`;
  }).join(' ');

  // Gradient ID
  const gradId = "flower-gradient";

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-lg">
        <defs>
          <radialGradient id={gradId} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#E6AA68" stopOpacity="0.8" /> {/* Yellow Center */}
            <stop offset="60%" stopColor="#C04E3F" stopOpacity="0.6" /> {/* Red Mid */}
            <stop offset="100%" stopColor="#7D4E57" stopOpacity="0.4" /> {/* Purple Edge */}
          </radialGradient>
        </defs>

        {/* Background Grid */}
        {[2, 4, 6, 8, 10].map(level => (
           <polygon 
             key={level}
             points={points.map(p => {
               const { x, y } = getCoordinates(level, p.angle);
               return `${x},${y}`;
             }).join(' ')} 
             fill="none" 
             stroke="#E6DCCD" 
             strokeWidth="1" 
             strokeDasharray="4 4"
           />
        ))}

        {/* The Flower Shape */}
        <path 
          d={`M ${polyPoints} Z`}
          fill={`url(#${gradId})`}
          stroke="#5D4037"
          strokeWidth="2"
          className="transition-all duration-500 ease-out"
        />

        {/* Points */}
        {points.map((p, i) => {
          const { x, y } = getCoordinates(p.value, p.angle);
          return (
            <circle 
                key={i} 
                cx={x} cy={y} 
                r="6" 
                fill={p.color} 
                stroke="white" 
                strokeWidth="2"
                className="transition-all duration-300"
            />
          );
        })}
      </svg>
    </div>
  );
};
