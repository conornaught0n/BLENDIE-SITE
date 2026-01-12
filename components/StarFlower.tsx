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

  // Normalize values to 0-100 range for plotting
  // Center is 150, 150. Radius is 100.
  const center = 150;
  const radius = 100;
  
  const points = [
    { label: 'Aroma', value: attributes.aroma, angle: 0 },
    { label: 'Body', value: attributes.body, angle: 72 },
    { label: 'Acidity', value: attributes.acidity, angle: 144 },
    { label: 'Sweetness', value: attributes.sweetness, angle: 216 },
    { label: 'Aftertaste', value: attributes.aftertaste, angle: 288 },
  ];

  const getCoordinates = (value: number, angle: number) => {
    const angleRad = (angle - 90) * (Math.PI / 180); // -90 to start at top
    const r = (value / 10) * radius;
    const x = center + r * Math.cos(angleRad);
    const y = center + r * Math.sin(angleRad);
    return { x, y };
  };

  const polyPoints = points.map(p => {
    const { x, y } = getCoordinates(p.value, p.angle);
    return `${x},${y}`;
  }).join(' ');

  const fullPolyPoints = points.map(p => {
    const { x, y } = getCoordinates(10, p.angle); // Max value 10
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      <h3 className="mb-4 text-xl font-semibold text-foreground">Flavor Profile</h3>
      <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-xl">
        {/* Background Grid (Pentagon) */}
        <polygon points={fullPolyPoints} fill="none" stroke="#D4AF37" strokeOpacity="0.2" strokeWidth="1" />
        {[2, 4, 6, 8].map(level => (
           <polygon 
             key={level}
             points={points.map(p => {
               const { x, y } = getCoordinates(level, p.angle);
               return `${x},${y}`;
             }).join(' ')} 
             fill="none" 
             stroke="#D4AF37" 
             strokeOpacity="0.1" 
             strokeWidth="0.5" 
           />
        ))}

        {/* Data Polygon */}
        <polygon 
          points={polyPoints} 
          fill="rgba(212, 175, 55, 0.4)" 
          stroke="#D4AF37" 
          strokeWidth="2"
          className="transition-all duration-500 ease-out"
        />

        {/* Points and Labels */}
        {points.map((p, i) => {
          const { x, y } = getCoordinates(p.value, p.angle);
          const labelCoords = getCoordinates(12, p.angle); // Position labels slightly outside
          return (
            <g key={i} onMouseEnter={() => setHovered(p.label)} onMouseLeave={() => setHovered(null)}>
              <circle cx={x} cy={y} r="4" fill="#D4AF37" className="cursor-pointer hover:fill-white transition-colors" />
              <text 
                x={labelCoords.x} 
                y={labelCoords.y} 
                textAnchor="middle" 
                alignmentBaseline="middle" 
                fill={hovered === p.label ? "#FFFFFF" : "#D4AF37"}
                className="text-xs font-medium uppercase tracking-wider transition-colors duration-300"
                style={{ fontSize: '10px' }}
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-4 h-6 text-sm text-[#E5C158]">
        {hovered ? `${hovered}: ${attributes[hovered.toLowerCase() as keyof typeof attributes]}/10` : 'Interact with the chart'}
      </div>
    </div>
  );
};
