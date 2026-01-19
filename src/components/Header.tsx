import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    const navLinks = [
        { name: 'Product', hasDropdown: true },
        { name: 'Solutions', hasDropdown: true },
        { name: 'Learn', hasDropdown: true },
        { name: 'Pricing', hasDropdown: false },
        { name: 'Enterprise', hasDropdown: false },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <img
                        src="/images/xcqc_logo.png"
                        alt="XCQC Logo"
                        className="h-20 w-auto object-contain"
                    />
                </div>

                {/* Navigation Links */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1 hover:bg-neutral-100 rounded-lg"
                        >
                            {link.name}
                            {link.hasDropdown && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-60">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <button className="hidden xl:block px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                        Contact Sales
                    </button>

                    <a
                        href="https://qc.xtracover.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-medium text-neutral-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Login
                    </a>


                </div>
            </div>
        </header>
    );
};

export default Header;
