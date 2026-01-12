import React from 'react';

export const Hero = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white px-4 sm:px-6 lg:px-8">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-[128px]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h1 className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent text-6xl font-bold tracking-tight sm:text-8xl md:text-9xl">
          BLENDIE
        </h1>
        <p className="mt-6 text-lg tracking-wide text-gray-400 sm:text-xl md:text-2xl max-w-2xl mx-auto">
          Experience the seamless fusion of design and technology.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group relative rounded-full bg-white px-8 py-3 text-black transition-all hover:bg-gray-200">
            <span className="relative z-10 font-medium">Get Started</span>
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10 blur-md" />
          </button>
          <button className="rounded-full border border-gray-700 px-8 py-3 text-gray-300 transition-colors hover:border-white hover:text-white">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};
