import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Transform logic:
    // Using relative scroll progress (0 to 1) of the Hero section.
    // 0 = Start of page.
    // 1 = Hero is fully scrolled out (Laptop takes over).

    // We start the transition LATE (at 0.7 or 70% scroll), 
    // ensuring the user is mostly done with the white section.
    // The laptop (next section) starts appearing.

    // Animation to make logo appear to go INTO the laptop
    // Move logo down significantly (400px) so it travels toward the laptop
    const y = useTransform(scrollYProgress, [0.7, 1], [0, 400]);
    // Scale down more aggressively to create depth illusion (to 0.3)
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
    // Fade out at ~0.74 scroll progress (when y≈53px, scale≈0.48)
    const opacity = useTransform(scrollYProgress, [0.74, 0.76], [1, 0]);

    return (
        <section ref={containerRef} className="min-h-screen bg-white text-black flex flex-col items-center justify-center relative overflow-hidden py-10">

            <div className="z-20 flex flex-col items-center text-center max-w-5xl px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-2 leading-tight text-neutral-900"
                >
                    New era of device diagnostics
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-10 text-neutral-400"
                >
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="flex flex-wrap gap-4 mb-20 justify-center"
                >
                    <button className="px-8 py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-all cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        View Demo
                    </button>
                    <button className="px-8 py-3 bg-gray-100 text-neutral-900 rounded-xl font-medium hover:bg-gray-200 transition-all cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                        Learn More
                    </button>
                </motion.div>

                {/* Logo in normal flow, below buttons */}
                <motion.div
                    style={{ y, scale, opacity }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 w-full max-w-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Subtle gradient glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-200  to-blue-200 blur-3xl opacity-40 rounded-full" />
                    <img
                        src="/images/xcqc_logo.png"
                        alt="XCQC Logo"
                        className="relative z-10 w-full h-auto object-contain drop-shadow-xl"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
