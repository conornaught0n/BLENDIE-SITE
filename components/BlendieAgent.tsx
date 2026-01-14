"use client";

import React, { useState } from 'react';

export const BlendieAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'blendie', text: "Hey! I'm Blendie. Need help crafting your perfect roast?" }
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-20 z-50 flex flex-col items-end">
      
      {/* Chat Bubble / Window */}
      <div 
        className={`mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#D4AF37] p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">
            🧞‍♂️
          </div>
          <div>
            <h3 className="font-bold text-black text-sm">Blendie McBlenderson</h3>
            <p className="text-black/60 text-xs">Magic Barista</p>
          </div>
        </div>
        
        <div className="h-64 p-4 overflow-y-auto bg-[#F5F5F4] space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'blendie' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                msg.role === 'blendie' 
                  ? 'bg-white text-black border border-black/5 rounded-tl-none' 
                  : 'bg-black text-white rounded-tr-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-white border-t border-black/5">
          <input 
            type="text" 
            placeholder="Ask me about flavor..." 
            className="w-full bg-[#F5F5F4] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
          />
        </div>
      </div>

      {/* Floating Avatar Trigger */}
      <button 
        onClick={toggleChat}
        className="group relative w-14 h-14 bg-white rounded-full shadow-lg border border-[#D4AF37]/20 flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
      >
        <span className="text-2xl animate-pulse">🧞‍♂️</span>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
        </span>
      </button>

    </div>
  );
};
