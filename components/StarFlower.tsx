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
  const center = 150;
  const radius = 100;
  
  // Updated Colors: Fresh & Fruity
  const points = [
    { label: 'Aroma', value: attributes.aroma, angle: 0, color: '#540D6E' }, // Plum
    { label: 'Body', value: attributes.body, angle: 72, color: '#1E1E24' }, // Ink (Solid Base)
    { label: 'Acidity', value: attributes.acidity, angle: 144, color: '#FFB703' }, // Citrus
    { label: 'Sweetness', value: attributes.sweetness, angle: 216, color: '#FF4D6D' }, // Berry
    { label: 'Aftertaste', value: attributes.aftertaste, angle: 288, color: '#F28482' }, // Peach
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

  const gradId = "fruit-gradient";

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-xl">
        <defs>
          <radialGradient id={gradId} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FFB703" stopOpacity="0.9" /> {/* Citrus Center */}
            <stop offset="50%" stopColor="#FF4D6D" stopOpacity="0.7" /> {/* Berry Mid */}
            <stop offset="100%" stopColor="#540D6E" stopOpacity="0.5" /> {/* Plum Edge */}
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
             stroke="#F0F0F0" 
             strokeWidth="1.5" 
             strokeDasharray="2 4"
           />
        ))}

        {/* The Flower Shape */}
        <path 
          d={`M ${polyPoints} Z`}
          fill={`url(#${gradId})`}
          stroke="#540D6E"
          strokeWidth="2.5"
          className="transition-all duration-500 ease-out"
        />

        {/* Points */}
        {points.map((p, i) => {
          const { x, y } = getCoordinates(p.value, p.angle);
          return (
            <circle 
                key={i} 
                cx={x} cy={y} 
                r="5" 
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
