"use client";

import React from 'react';

// Mock Data for "Trend" (In real app, this tracks history of edits)
const MOCK_HISTORY = [
  { step: 1, price: 15.00, score: 7.2 },
  { step: 2, price: 16.50, score: 7.8 },
  { step: 3, price: 16.20, score: 8.1 },
  { step: 4, price: 15.80, score: 8.4 },
  { step: 5, price: 15.50, score: 8.5 }, // Current
];

export const StockGraph = ({ currentPrice, currentScore }: { currentPrice: string, currentScore: number }) => {
  // Normalize data for SVG coordinates (0-100 range)
  const maxPrice = 25;
  const maxScore = 10;
  
  const width = 300;
  const height = 100;
  
  const getPoints = (type: 'price' | 'score') => {
    return MOCK_HISTORY.map((h, i) => {
      const x = (i / (MOCK_HISTORY.length - 1)) * width;
      const y = height - ((type === 'price' ? h.price / maxPrice : h.score / maxScore) * height);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="w-full bg-white border border-border-color rounded-lg p-4 relative overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xs uppercase tracking-widest font-bold opacity-50">Blend Performance</h4>
        <div className="flex gap-4 text-xs">
            <span className="text-coffee-brown font-bold">● Price</span>
            <span className="text-coffee-yellow font-bold">● Quality</span>
        </div>
      </div>

      <svg width="100%" height="100" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Grid Lines */}
        <line x1="0" y1="25" x2={width} y2="25" stroke="#000" strokeOpacity="0.05" strokeDasharray="4 4" />
        <line x1="0" y1="50" x2={width} y2="50" stroke="#000" strokeOpacity="0.05" strokeDasharray="4 4" />
        <line x1="0" y1="75" x2={width} y2="75" stroke="#000" strokeOpacity="0.05" strokeDasharray="4 4" />

        {/* Price Line */}
        <polyline 
            points={getPoints('price')} 
            fill="none" 
            stroke="#5D4037" 
            strokeWidth="2" 
            strokeLinecap="round"
            className="drop-shadow-sm"
        />
        
        {/* Score Line */}
        <polyline 
            points={getPoints('score')} 
            fill="none" 
            stroke="#E6AA68" 
            strokeWidth="2" 
            strokeLinecap="round"
            className="drop-shadow-sm"
        />

        {/* Current Points (End of line) */}
        <circle cx={width} cy={height - (parseFloat(currentPrice)/maxPrice)*height} r="4" fill="#5D4037" stroke="white" strokeWidth="2" />
        <circle cx={width} cy={height - (currentScore/maxScore)*height} r="4" fill="#E6AA68" stroke="white" strokeWidth="2" />
      </svg>
      
      <div className="mt-2 flex justify-between text-[10px] opacity-40 uppercase tracking-widest font-mono">
        <span>Start</span>
        <span>Current Mix</span>
      </div>
    </div>
  );
};
