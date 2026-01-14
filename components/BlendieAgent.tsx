"use client";

import React, { useState } from 'react';

// Knowledge Base inspired by Scott Rao & Jonathan Gagné
const KNOWLEDGE_BASE = [
  { keywords: ['extract', 'yield', 'ey'], response: "Targeting 20-22% extraction yield is ideal for filter. If it tastes astringent, you've likely channeled or ground too fine. Check your bed depth." },
  { keywords: ['grind', 'fine', 'coarse'], response: "Grind size determines surface area. For percolation, you want the finest grind that doesn't clog the filter. Fines migration is the enemy of clarity." },
  { keywords: ['water', 'temp', 'temperature'], response: "Use boiling water (99-100°C) for light roasts! You can't burn coffee that has already been roasted at 200°C+. High temp maximizes extraction of dense beans." },
  { keywords: ['ratio', 'recipe'], response: "Start with 1:16 or 1:17 (60g/L). It's the golden ratio for a reason. Adjust strength by changing the ratio, adjust extraction by changing grind." },
  { keywords: ['agitate', 'spin', 'swirl'], response: "A gentle swirl after pouring (The Rao Spin) flattens the bed and prevents channeling. Don't over-agitate or you'll clog the filter with fines." },
  { keywords: ['blend', 'mix'], response: "When blending, match solubility. Don't mix a super dense Ethiopian with a porous dark roast Brazil—they will extract at different rates." },
];

export const BlendieAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'blendie', text: "Hey! I'm Blendie. I know a thing or two about extraction physics. Ask me about brewing!" }
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // User Message
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    
    // Logic: Find matching keywords
    const lowerInput = input.toLowerCase();
    const hit = KNOWLEDGE_BASE.find(k => k.keywords.some(word => lowerInput.includes(word)));
    
    const replyText = hit 
      ? hit.response 
      : "That's an interesting variable. Generally, focus on even extraction and consistent water temperature. Have you checked your grind distribution?";

    // Simulate Response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'blendie', text: replyText }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Bubble / Window */}
      <div 
        className={`mb-4 w-80 bg-background rounded-lg shadow-2xl border border-border-color overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-fruit-plum text-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">
            🧞‍♂️
          </div>
          <div>
            <h3 className="font-bold text-sm">Blendie McBlenderson</h3>
            <p className="opacity-80 text-xs uppercase tracking-widest">Extraction Expert</p>
          </div>
        </div>
        
        <div className="h-64 p-4 overflow-y-auto bg-black/5 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'blendie' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] px-4 py-2 text-sm ${
                msg.role === 'blendie' 
                  ? 'bg-background text-foreground border border-border-color rounded-r-lg rounded-bl-lg' 
                  : 'bg-fruit-plum text-white rounded-l-lg rounded-br-lg'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-background border-t border-border-color flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about ratio, grind, temp..." 
            className="flex-1 bg-black/5 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-fruit-citrus"
          />
          <button 
            onClick={handleSend}
            className="bg-fruit-citrus text-black w-10 h-10 rounded flex items-center justify-center hover:opacity-90 transition-opacity font-bold"
          >
            ➤
          </button>
        </div>
      </div>

      {/* Floating Avatar Trigger */}
      <button 
        onClick={toggleChat}
        className="group relative w-14 h-14 bg-card-bg rounded-full shadow-lg border border-border-color flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
      >
        <span className="text-2xl animate-pulse">🧞‍♂️</span>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fruit-citrus opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-fruit-citrus"></span>
        </span>
      </button>

    </div>
  );
};
