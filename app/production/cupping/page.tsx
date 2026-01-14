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
    <div className="max-w-4xl mx-auto pb-20 text-foreground">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-fruit-plum mb-2">SCA Cupping Protocol</h1>
          <p className="text-foreground/60 text-sm">Quality control and sensory analysis.</p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-widest text-foreground/50 mb-1">Total Score</div>
          <div className={`text-4xl font-bold ${totalScore >= 80 ? 'text-fruit-green' : 'text-fruit-citrus'}`}>
            {totalScore.toFixed(2)}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sample Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="card-soft space-y-4">
            <h3 className="font-bold text-foreground mb-4">Sample Details</h3>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Batch / Sample ID</label>
              <input 
                type="text" 
                className="w-full bg-white border border-border-color rounded px-3 py-2 text-foreground focus:border-fruit-plum/40 outline-none"
                placeholder="e.g. A17-004"
                value={formData.sampleId}
                onChange={e => setFormData({...formData, sampleId: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Roast Date</label>
              <input 
                type="date" 
                className="w-full bg-white border border-border-color rounded px-3 py-2 text-foreground focus:border-fruit-plum/40 outline-none"
                value={formData.roastDate}
                onChange={e => setFormData({...formData, roastDate: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Roast Color</label>
              <select 
                className="w-full bg-white border border-border-color rounded px-3 py-2 text-foreground focus:border-fruit-plum/40 outline-none"
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
              <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Sensory Notes</label>
              <textarea 
                className="w-full bg-white border border-border-color rounded px-3 py-2 text-foreground focus:border-fruit-plum/40 outline-none h-32 resize-none"
                placeholder="Describe flavors, defects, etc."
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
              />
            </div>
            
            <button className="w-full bg-fruit-plum text-white font-bold py-3 rounded hover:bg-fruit-berry transition-colors shadow-lg shadow-fruit-plum/20">
              Submit Assessment
            </button>
          </div>
        </div>

        {/* Scoring Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="card-soft">
            <h3 className="font-bold text-foreground mb-6">Sensory Scores (0-10)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {Object.entries(formData.scores).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <label className="capitalize text-sm font-bold text-foreground/80">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <span className="font-mono text-fruit-plum font-bold">{value}</span>
                  </div>
                  <input 
                    type="range" 
                    min="6" 
                    max="10" 
                    step="0.25"
                    value={value}
                    onChange={(e) => handleScoreChange(key, parseFloat(e.target.value))}
                    className="w-full h-8 bg-fruit-plum/10 rounded-lg appearance-none cursor-pointer accent-fruit-plum touch-pan-x"
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
