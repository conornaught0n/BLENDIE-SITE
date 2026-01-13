import { Hero } from "@/components/Hero";
import { StarFlower } from "@/components/StarFlower";
import { Configurator } from "@/components/Configurator";
import { Traceability } from "@/components/Traceability";

export default function StagingV2() {
  return (
    <main className="bg-background min-h-screen">
      <div className="bg-yellow-500/20 border-b border-yellow-500 text-yellow-200 text-center py-2 text-sm font-mono uppercase tracking-widest">
        Staging V2 Preview - Build ID: {Date.now()}
      </div>
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

      <section className="py-24 px-4">
         <Traceability />
      </section>
    </main>
  );
}
