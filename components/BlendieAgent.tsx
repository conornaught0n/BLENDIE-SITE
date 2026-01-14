"use client";

import React, { useState } from 'react';

export const BlendieAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'blendie', text: "Hey! I'm Blendie. I'm literally a coffee bean. Ask me anything!" }
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Quick Actions Logic
  const handleQuickAction = (action: string) => {
    const responseMap: Record<string, string> = {
      'Cheaper?': "To lower the cost, try increasing the ratio of Brazilian or Mexican beans. They offer great body at a lower price point!",
      'Espresso?': "For espresso, aim for low acidity and high body. A 50% Brazil / 50% Colombia blend is a classic starting point.",
      'Filter?': "For filter, go wild with Ethiopians and Kenyans! Keep the roast light to preserve those floral notes.",
      'Decaf?': "Our Sugar Cane Decaf from Colombia is surprisingly sweet. You won't even miss the caffeine."
    };
    
    setMessages(prev => [...prev, 
        { role: 'user', text: action },
        { role: 'blendie', text: responseMap[action] || "I can help with that!" }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Bubble */}
      <div 
        className={`mb-4 w-80 bg-white rounded-3xl rounded-br-none shadow-2xl border border-border-color overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-fruit-plum text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             {/* Bean Character Avatar */}
             <div className="w-10 h-10 bg-[#5D4037] rounded-full flex items-center justify-center border-2 border-white/20 relative overflow-hidden">
                <div className="w-1 h-6 bg-black/20 absolute left-1/2 -translate-x-1/2 rotate-12 rounded-full" /> {/* Bean Split */}
                <div className="w-2 h-2 bg-white rounded-full absolute top-2 right-2 opacity-50" /> {/* Eye */}
                <div className="w-2 h-2 bg-white rounded-full absolute top-2 left-2 opacity-50" /> {/* Eye */}
             </div>
             <div>
                <h3 className="font-bold text-sm">Blendie</h3>
                <p className="opacity-60 text-[10px] uppercase tracking-widest">AI Roaster</p>
             </div>
          </div>
          <button onClick={toggleChat} className="text-white/50 hover:text-white">✕</button>
        </div>
        
        <div className="h-64 p-4 overflow-y-auto bg-[#F9F9F9] space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'blendie' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] px-4 py-3 text-sm shadow-sm ${
                msg.role === 'blendie' 
                  ? 'bg-white text-foreground rounded-2xl rounded-tl-none border border-black/5' 
                  : 'bg-fruit-citrus text-black rounded-2xl rounded-tr-none font-medium'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide bg-white border-t border-black/5">
            {['Cheaper?', 'Espresso?', 'Filter?', 'Decaf?'].map(action => (
                <button 
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="whitespace-nowrap px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold hover:bg-fruit-plum hover:text-white transition-colors"
                >
                    {action}
                </button>
            ))}
        </div>

        <div className="p-3 bg-white flex gap-2">
          <input 
            type="text" 
            placeholder="Ask Blendie..." 
            className="flex-1 bg-black/5 rounded-full px-4 py-2 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Floating Bean Trigger */}
      <button 
        onClick={toggleChat}
        className={`group relative w-16 h-16 bg-[#5D4037] rounded-full shadow-2xl border-4 border-white flex items-center justify-center hover:scale-110 transition-transform active:scale-95 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        {/* Simple CSS Bean Shape */}
        <div className="w-8 h-10 bg-[#3E2723] rounded-[50%] relative overflow-hidden rotate-[-15deg]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-black/30 rounded-full rotate-[15deg]" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
            <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-2 bg-black/30 rounded-full" /> {/* Smile */}
        </div>
        
        {/* Notification Bubble */}
        <span className="absolute -top-1 -right-1 bg-fruit-berry text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white animate-bounce">
            Hi!
        </span>
      </button>

    </div>
  );
};
