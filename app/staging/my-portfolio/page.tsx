import { Hero } from "@/components/Hero";
import { StarFlower } from "@/components/StarFlower";
import { Configurator } from "@/components/Configurator";

export default function StagingPortfolio() {
  return (
    <main className="bg-background min-h-screen">
      <Hero />
      
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            
            {/* Flavor Profile Section */}
            <div className="flex flex-col items-center">
              <h2 className="mb-8 text-3xl font-bold text-[#D4AF37]">Flavor Profile</h2>
              <StarFlower />
              <p className="mt-8 text-center text-white/70 max-w-md">
                Our signature blend offers a balanced complexity with notes of dark chocolate, toasted hazelnut, and a hint of citrus acidity.
              </p>
            </div>

            {/* Configurator Section */}
            <div className="flex flex-col items-center">
               <Configurator />
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 px-4 text-center">
         <h2 className="text-2xl text-[#D4AF37] mb-4">Traceability</h2>
         <p className="text-white/60">Enter your batch code (e.g., A17) to trace your coffee's journey.</p>
         {/* Placeholder for Traceability Input - can be added later or now if simple */}
         <div className="mt-6 flex justify-center gap-2">
            <input type="text" placeholder="Batch Code" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]" />
            <button className="bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-bold">Trace</button>
         </div>
      </section>
    </main>
  );
}
