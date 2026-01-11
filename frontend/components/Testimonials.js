'use client';

import React from 'react';
import { Card, Avatar, Rate, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Graphic Designer",
        content: "ReplyBoost changed my life. I went from sending 20 proposals a day to just 5, and I'm getting way more interviews. The AI just gets it.",
        rating: 5
    },
    {
        name: "Mike Chen",
        role: "Full Stack Developer",
        content: "The personalization is insane. Clients think I spent hours researching their company when it literally took me seconds.",
        rating: 5
    },
    {
        name: "Elena Rodriguez",
        role: "Copywriter",
        content: "Finally, a tool that helps me stand out without sounding like a robot. It captures my tone perfectly.",
        rating: 5
    }
];

export default function Testimonials({ theme = 'light' }) {
    const isDark = theme === 'dark';

    return (
        <section className={`py-24 ${isDark ? 'bg-transparent' : 'bg-slate-50'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Loved by Freelancers Worldwide
                    </h2>
                    <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Don&apos;t just take our word for it. See what others are saying.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                        >
                            <div className={`h-full p-8 rounded-2xl transition-all duration-300 ${isDark
                                    ? 'glass-card hover:bg-white/5 border border-white/5'
                                    : 'bg-white shadow-sm hover:shadow-xl'
                                }`}>
                                <div className="flex gap-1 text-yellow-500 mb-6">
                                    <Rate disabled defaultValue={item.rating} className="text-sm" />
                                </div>
                                <p className={`text-lg leading-relaxed mb-8 italic ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    &quot;{item.content}&quot;
                                </p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <Avatar size={48} icon={<UserOutlined />} className="bg-indigo-500/20 text-indigo-400" />
                                    <div>
                                        <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</div>
                                        <div className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{item.role}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
