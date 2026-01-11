'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { RocketOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-6'}`}
            >
                <div className={`
          relative flex items-center justify-between
          w-full max-w-5xl px-6 py-3
          rounded-2xl border border-white/10
          bg-slate-900/60 backdrop-blur-xl shadow-lg shadow-black/20
          transition-all duration-300
          ${scrolled ? 'py-2 bg-slate-900/80' : ''}
        `}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 overflow-hidden">
                            <RocketOutlined className="text-lg relative z-10" />
                            <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                            ReplyBoost
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Features', 'How it works', 'Pricing'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/login">
                            <span className="text-sm font-medium text-slate-300 hover:text-white cursor-pointer px-3 py-2 transition-colors">
                                Log in
                            </span>
                        </Link>
                        <Link href="/register">
                            <Button
                                type="primary"
                                className="bg-indigo-600 hover:bg-indigo-500 border-none shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] font-semibold h-9 rounded-full px-5 hover:scale-105 transition-transform"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden text-white text-xl cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl pt-28 px-8 md:hidden flex flex-col items-center gap-8"
                    >
                        {['Features', 'How it works', 'Pricing'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-2xl font-medium text-slate-300 hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                        <div className="w-full h-px bg-white/10 my-4"></div>
                        <Link href="/login" className="text-xl text-slate-300" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                        <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                            <Button type="primary" size="large" className="w-full bg-indigo-600 border-none h-12 text-lg rounded-xl">
                                Get Started
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
