'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Input } from 'antd';
import {
    RocketOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    GithubOutlined,
    InstagramOutlined,
    SendOutlined
} from '@ant-design/icons';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-950 pt-24 pb-10 overflow-hidden border-t border-white/5">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-900/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400">
                                <RocketOutlined className="text-xl" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">
                                ReplyBoost
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            AI-powered proposal generator that helps freelancers win more jobs on Upwork & Fiverr with less effort.
                        </p>
                        <div className="flex gap-4">
                            {[TwitterOutlined, LinkedinOutlined, GithubOutlined, InstagramOutlined].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Product</h4>
                        <ul className="space-y-4">
                            {['Features', 'Pricing', 'Testimonials', 'Integration', 'Changelog'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Resources</h4>
                        <ul className="space-y-4">
                            {['Blog', 'Community', 'Help Center', 'API Docs', 'Status'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Stay Updated</h4>
                        <p className="text-slate-400 mb-4 text-sm">
                            Get the latest updates and freelancing tips directly in your inbox.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Input
                                placeholder="Enter your email"
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 hover:bg-white/10 hover:border-white/20 focus:bg-white/10 focus:border-indigo-500 h-10 rounded-lg"
                            />
                            <Button type="primary" icon={<SendOutlined />} className="bg-indigo-600 border-none h-10 rounded-lg hover:bg-indigo-500 w-full">
                                Subscribe
                            </Button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© {currentYear} ReplyBoost. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
