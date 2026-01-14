"use client";

import React from 'react';

interface StarFlowerProps {
  attributes?: {
    body: number;
    dark: number;
    bright: number;
    fruity: number;
    sweet: number;
  };
}

export const StarFlower: React.FC<StarFlowerProps> = ({
  attributes = { body: 7, dark: 6, bright: 8, fruity: 9, sweet: 7 }
}) => {
  const center = 150;
  const radius = 100;
  
  // Updated Axes: BODY, DARK, BRIGHT, FRUITY, SWEET
  const points = [
    { label: 'BODY', value: attributes.body, angle: 0, color: '#2C1810' }, // Dark Brown
    { label: 'DARK', value: attributes.dark, angle: 72, color: '#5D4037' }, // Roast Brown
    { label: 'BRIGHT', value: attributes.bright, angle: 144, color: '#FFB703' }, // Citrus Yellow
    { label: 'FRUITY', value: attributes.fruity, angle: 216, color: '#FF4D6D' }, // Berry Red
    { label: 'SWEET', value: attributes.sweet, angle: 288, color: '#F28482' }, // Peach Pink
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

  const gradId = "flavor-gradient";

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-lg">
        <defs>
          <radialGradient id={gradId} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FFB703" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FF4D6D" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2C1810" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* Circular Grid (Instead of pentagon) */}
        {[2, 4, 6, 8, 10].map(level => (
           <circle 
             key={level}
             cx={center}
             cy={center}
             r={(level / 10) * radius}
             fill="none" 
             stroke="#F0F0F0" 
             strokeWidth="1" 
             strokeDasharray="2 4"
           />
        ))}

        {/* Axis Lines */}
        {points.map((p, i) => {
            const { x, y } = getCoordinates(10, p.angle);
            return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#F0F0F0" strokeWidth="1" />;
        })}

        {/* The Blob Shape */}
        <path 
          d={`M ${polyPoints} Z`}
          fill={`url(#${gradId})`}
          stroke="#FF4D6D"
          strokeWidth="2"
          className="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        />

        {/* Labels */}
        {points.map((p, i) => {
          const { x, y } = getCoordinates(12, p.angle); // Outer rim
          return (
            <text 
                key={i} 
                x={x} y={y} 
                textAnchor="middle" 
                alignmentBaseline="middle"
                className="text-[10px] font-bold font-sans uppercase fill-foreground/60 tracking-widest"
            >
                {p.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
