
import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import ScrollSequence from './components/ScrollSequence';
import Hero from './components/Hero'

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // lenis.destroy() might not be needed if we want it persistent, 
      // but strictly cleaning up is good. 
      // However, destroy() might break HMR if not handled carefully.
      // We'll leave it simple.
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-charcoal-void min-h-screen text-white selection:bg-sony-blue selection:text-white">
      <Header />
      <Hero />

      <ScrollSequence />

      <section className="h-screen flex items-center justify-center relative z-10 bg-charcoal-void">
        <div className="text-center">
          <h2 className="text-4xl font-light tracking-wide mb-6">Experience the Future</h2>
          <button className="px-8 py-3 bg-sony-blue hover:bg-black border border-sony-blue hover:border-white transition-all duration-300 rounded-full text-white font-medium tracking-wide">
            Pre-Order Now
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
