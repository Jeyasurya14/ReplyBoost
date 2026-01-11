'use client';

import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';

const { Text } = Typography;

export default function TrustLogos() {
    const logos = [
        { name: 'Upwork', color: '#14a800' },
        { name: 'Fiverr', color: '#1dbf73' },
        { name: 'Freelancer', color: '#29b2fe' },
        { name: 'PeoplePerHour', color: '#ff6b00' },
        { name: 'Toptal', color: '#204ecf' },
    ];

    return (
        <section className="py-10 border-b border-slate-100 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <Text className="block text-slate-400 font-medium mb-6 uppercase tracking-widest text-xs">
                    Trusted by freelancers on
                </Text>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {logos.map((logo, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-2xl font-bold font-sans flex items-center gap-2"
                            style={{ color: logo.color }}
                        >
                            {/* Fallback to text if no SVG, using color to branding */}
                            <span>{logo.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
