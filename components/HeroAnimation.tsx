"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const HeroAnimation = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#FFFDF9]">
      {/* Floating Shapes Animation (CSS Only for performance/simplicity) */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-fruit-citrus/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fruit-berry/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fruit-peach/10 rounded-full blur-[100px]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#540D6E 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
    </div>
  );
};
