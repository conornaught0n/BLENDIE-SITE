"use client";

import React, { useState } from 'react';

export const BlendieAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'blendie', text: "Hey! I'm Blendie. Need help crafting your perfect roast?" }
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // User Message
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    
    // Simulate Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'blendie', 
        text: "That sounds delicious! I'd recommend trying a 60/40 split with the Ethiopia for more floral notes." 
      }]);
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
        <div className="bg-foreground text-background p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-xl shadow-sm">
            🧞‍♂️
          </div>
          <div>
            <h3 className="font-bold text-sm">Blendie McBlenderson</h3>
            <p className="opacity-60 text-xs uppercase tracking-widest">Magic Barista</p>
          </div>
        </div>
        
        <div className="h-64 p-4 overflow-y-auto bg-black/5 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'blendie' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] px-4 py-2 text-sm ${
                msg.role === 'blendie' 
                  ? 'bg-background text-foreground border border-border-color rounded-r-lg rounded-bl-lg' 
                  : 'bg-foreground text-background rounded-l-lg rounded-br-lg'
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
            placeholder="Ask me about flavor..." 
            className="flex-1 bg-black/5 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-gold"
          />
          <button 
            onClick={handleSend}
            className="bg-accent-gold text-white w-10 h-10 rounded flex items-center justify-center hover:opacity-90 transition-opacity"
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
        {/* Notification Dot */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-gold"></span>
        </span>
      </button>

    </div>
  );
};
