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

export default function Testimonials() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <Title level={2} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Loved by Freelancers Worldwide
                    </Title>
                    <Text className="text-slate-500 text-lg">
                        Don&apos;t just take our word for it. See what others are saying.
                    </Text>
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
                            <Card className="h-full border-none shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-2xl glass">
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    <Rate disabled defaultValue={item.rating} className="text-sm" />
                                </div>
                                <Paragraph className="text-slate-700 text-lg leading-relaxed mb-6 italic">
                                    &quot;{item.content}&quot;
                                </Paragraph>
                                <div className="flex items-center gap-4 mt-auto">
                                    <Avatar size={48} icon={<UserOutlined />} className="bg-indigo-100 text-indigo-600" />
                                    <div>
                                        <div className="font-bold text-slate-900">{item.name}</div>
                                        <div className="text-slate-500 text-sm">{item.role}</div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
