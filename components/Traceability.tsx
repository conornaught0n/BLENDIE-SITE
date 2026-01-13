"use client";

import React, { useState } from 'react';

// Mock Data moved to client-side for Static Export compatibility
const MOCK_DB: Record<string, any> = {
  'A17': {
    id: 'A17',
    roastDate: '2023-10-25',
    origin: 'Ethiopia / Colombia',
    tastingNotes: ['Jasmine', 'Honey', 'Bergamot'],
    roaster: 'Alex',
    status: 'Verified',
    safetyChecks: {
      pesticides: 'Passed',
      mycotoxins: 'Passed',
      heavyMetals: 'Passed'
    }
  }
};

export const Traceability = () => {
  const [batchId, setBatchId] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrace = async () => {
    if (!batchId) return;
    
    setLoading(true);
    setError('');
    setData(null);

    // Simulate network delay
    setTimeout(() => {
      const result = MOCK_DB[batchId.toUpperCase()];
      
      if (result) {
        setData(result);
      } else {
        setError('Batch not found. Please check your code (e.g., "A17").');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
       <h2 className="text-3xl font-bold text-[#D4AF37] mb-4">Traceability</h2>
       <p className="text-white/60 mb-8">Enter your batch code to trace the journey from farm to cup.</p>
       
       <div className="flex justify-center gap-2 mb-8">
          <input 
            type="text" 
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            placeholder="Batch Code (e.g., A17)" 
            className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:bg-black/40 transition-colors w-full max-w-xs" 
          />
          <button 
            onClick={handleTrace}
            disabled={loading}
            className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#002B1B] px-8 py-3 rounded-full font-bold transition-all disabled:opacity-50"
          >
            {loading ? 'Tracing...' : 'Trace'}
          </button>
       </div>

       {error && (
         <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200">
           {error}
         </div>
       )}

       {data && (
         <div className="mt-8 text-left bg-black/40 border border-[#D4AF37]/20 rounded-2xl p-8 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex justify-between items-start mb-6">
             <div>
               <h3 className="text-2xl font-bold text-white">Batch {data.id}</h3>
               <p className="text-[#D4AF37] text-sm">Roast Date: {data.roastDate}</p>
             </div>
             <span className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
               {data.status}
             </span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
               <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Origin</h4>
               <p className="text-lg text-white font-serif">{data.origin}</p>
             </div>
             
             <div>
               <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Roaster</h4>
               <p className="text-lg text-white">{data.roaster}</p>
             </div>
             
             <div>
               <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Tasting Notes</h4>
               <div className="flex flex-wrap gap-2">
                 {data.tastingNotes.map((note: string) => (
                   <span key={note} className="text-sm bg-white/5 px-3 py-1 rounded-full text-white/80">
                     {note}
                   </span>
                 ))}
               </div>
             </div>

             <div>
               <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Safety Checks</h4>
               <ul className="space-y-1">
                 {Object.entries(data.safetyChecks).map(([key, value]) => (
                   <li key={key} className="flex justify-between text-sm">
                     <span className="text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                     <span className="text-green-400">✓ {String(value)}</span>
                   </li>
                 ))}
               </ul>
             </div>
           </div>
         </div>
       )}
    </div>
  );
};
