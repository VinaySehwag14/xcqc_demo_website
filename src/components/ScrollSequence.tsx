
import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const frameCount = 240;
const images: HTMLImageElement[] = [];

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    const filename = `ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
    img.src = `/images/sequence/${filename}`;
    images.push(img);
}

const ScrollSequence: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [currentFrame, setCurrentFrame] = useState(0);

    // Update frame based on scroll
    useEffect(() => {
        const updateFrame = (latest: number) => {
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(latest * frameCount)
            );
            if (frameIndex !== currentFrame) {
                requestAnimationFrame(() => renderFrame(frameIndex));
                setCurrentFrame(frameIndex);
            }
        };

        const unsubscribe = scrollYProgress.on("change", updateFrame);
        return () => unsubscribe();
    }, [scrollYProgress, currentFrame]);

    // Initial render
    useEffect(() => {
        const img = images[0];
        if (img.complete) {
            renderFrame(0);
        } else {
            img.onload = () => renderFrame(0);
        }
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[index];
        if (!img) return;

        // Maintain aspect ratio cover
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(currentFrame);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [currentFrame]);


    return (
        <div ref={containerRef} className="h-[500vh] relative bg-charcoal-void">
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-charcoal-void/50 to-transparent" />
            </div>

            {/* Overlay Text Content */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <Section progress={scrollYProgress} start={0.05} end={0.15}>
                    <img
                        src="/images/xcqc_logo.png"
                        alt="XCQC Logo"
                        className="w-72 md:w-96 h-auto mx-auto drop-shadow-2xl"
                    />
                </Section>

                <Section progress={scrollYProgress} start={0.3} end={0.4}>
                    <h2 className="text-5xl font-semibold">One QC engine for everything</h2>
                    <p className="text-lg text-white/60 mt-4">Mobile, laptop, desktop, motherboard</p>
                </Section>

                <Section progress={scrollYProgress} start={0.6} end={0.7}>
                    <h2 className="text-5xl font-semibold">Multi-Point QC</h2>
                    {/* <p className="text-lg text-white/60 mt-4">Terminals floating in a vacuum.</p> */}
                </Section>

                <Section progress={scrollYProgress} start={0.85} end={0.95}>
                    <h2 className="text-5xl font-semibold">Tamperproof Test Results</h2>
                    <p className="text-lg text-white/60 mt-4">Every test logged, time-stamped, and traceable end to end.</p>
                </Section>
            </div>
        </div>
    );
};

const Section = ({ progress, start, end, children }: { progress: any, start: number, end: number, children: React.ReactNode }) => {
    const opacity = useTransform(progress, [start - 0.05, start, end, end + 0.05], [0, 1, 1, 0]);
    const y = useTransform(progress, [start - 0.05, start, end, end + 0.05], [50, 0, 0, -50]);

    return (
        <motion.div
            style={{ opacity, y }}
            className="fixed bottom-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4"
        >
            {children}
        </motion.div>
    );
}

export default ScrollSequence;
