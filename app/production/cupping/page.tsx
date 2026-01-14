"use client";

import React, { useState } from 'react';

export default function CuppingForm() {
  const [formData, setFormData] = useState({
    sampleId: '',
    roastDate: '',
    roastColor: 'Medium',
    notes: '',
    scores: {
      aroma: 8,
      flavor: 8,
      aftertaste: 8,
      acidity: 8,
      body: 8,
      balance: 8,
      uniformity: 10,
      cleanCup: 10,
      sweetness: 10,
      overall: 8,
    }
  });

  const totalScore = Object.values(formData.scores).reduce((a, b) => a + b, 0);

  const handleScoreChange = (key: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        [key]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">SCA Cupping Protocol</h1>
          <p className="text-white/60 text-sm">Quality control and sensory analysis.</p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Total Score</div>
          <div className={`text-4xl font-bold ${totalScore >= 80 ? 'text-green-400' : 'text-orange-400'}`}>
            {totalScore.toFixed(2)}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sample Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-4">
            <h3 className="font-bold text-white mb-4">Sample Details</h3>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Batch / Sample ID</label>
              <input 
                type="text" 
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-white/40 outline-none"
                placeholder="e.g. A17-004"
                value={formData.sampleId}
                onChange={e => setFormData({...formData, sampleId: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Roast Date</label>
              <input 
                type="date" 
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-white/40 outline-none"
                value={formData.roastDate}
                onChange={e => setFormData({...formData, roastDate: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Roast Color</label>
              <select 
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-white/40 outline-none"
                value={formData.roastColor}
                onChange={e => setFormData({...formData, roastColor: e.target.value})}
              >
                <option>Light</option>
                <option>Medium-Light</option>
                <option>Medium</option>
                <option>Medium-Dark</option>
                <option>Dark</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Sensory Notes</label>
              <textarea 
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-white/40 outline-none h-32 resize-none"
                placeholder="Describe flavors, defects, etc."
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
              />
            </div>
            
            <button className="w-full bg-green-600 text-black font-bold py-3 rounded hover:bg-green-500 transition-colors">
              Submit Assessment
            </button>
          </div>
        </div>

        {/* Scoring Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-white/10">
            <h3 className="font-bold text-white mb-6">Sensory Scores (0-10)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {Object.entries(formData.scores).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <label className="capitalize text-sm font-bold text-white/80">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <span className="font-mono text-white">{value}</span>
                  </div>
                  <input 
                    type="range" 
                    min="6" 
                    max="10" 
                    step="0.25"
                    value={value}
                    onChange={(e) => handleScoreChange(key, parseFloat(e.target.value))}
                    className="w-full h-8 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500 touch-pan-x"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
