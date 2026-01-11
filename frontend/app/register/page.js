'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Alert } from 'antd';
import { UserOutlined, LockOutlined, RocketOutlined, MailOutlined, GoogleOutlined, GithubOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onFinish = async (values) => {
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/register', values);
            message.success('Registration successful! Please login.');
            router.push('/login');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleOAuth = (provider) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        window.location.href = `${apiUrl}/auth/login/${provider}`;
    };

    return (
        <div className="min-h-screen flex bg-[#030712] text-slate-200 font-sans">
            {/* Left Side - Cosmic Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 justify-center items-center p-12">
                <div className="absolute inset-0 bg-indigo-900/20 z-0"></div>
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-indigo-600/20 rounded-full blur-[100px] animate-[pulse_8s_infinite]"></div>
                <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-cyan-600/20 rounded-full blur-[100px] animate-[pulse_10s_infinite]"></div>

                <div className="relative z-10 max-w-lg text-center">
                    <div className="mb-12 inline-block">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-3xl flex items-center justify-center text-4xl text-white shadow-2xl shadow-indigo-500/30 mb-8 rotate-12 hover:rotate-0 transition-transform duration-500">
                            <RocketOutlined />
                        </div>
                        <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
                            Start Your Journey <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">To Top Rated</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-md mx-auto">
                            Join thousands of freelancers using AI to close deals faster. Your first 20 proposals are on us.
                        </p>
                    </div>

                    <div className="flex justify-center gap-2">
                        <div className="h-1 lg:w-20 bg-indigo-500 rounded-full opacity-50"></div>
                        <div className="h-1 lg:w-20 bg-slate-700 rounded-full opacity-50"></div>
                        <div className="h-1 lg:w-20 bg-slate-700 rounded-full opacity-50"></div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-24 relative">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">Create an Account</h2>
                        <p className="text-slate-500">Enter your details to get started for free.</p>
                    </div>

                    {error && <Alert message={error} type="error" showIcon className="bg-red-500/10 border border-red-500/20 text-red-200" />}

                    <Form
                        name="register_form"
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                        className="space-y-4"
                    >
                        <Form.Item
                            name="email"
                            label={<span className="text-slate-400">Email Address</span>}
                            rules={[
                                { required: true, message: 'Please input your Email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className="text-slate-500" />}
                                placeholder="name@example.com"
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 hover:bg-white/10 hover:border-indigo-500/50 focus:bg-white/10 focus:border-indigo-500 h-12 rounded-xl"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={<span className="text-slate-400">Password</span>}
                            rules={[
                                { required: true, message: 'Please input your Password!' },
                                { min: 6, message: 'Password must be at least 6 characters' }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-slate-500" />}
                                placeholder="Create a password"
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 hover:bg-white/10 hover:border-indigo-500/50 focus:bg-white/10 focus:border-indigo-500 h-12 rounded-xl"
                            />
                        </Form.Item>

                        <Form.Item className="pt-4">
                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-500 border-none rounded-xl font-bold shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2"
                                >
                                    Get Started Free <ArrowRightOutlined />
                                </Button>
                            </motion.div>
                        </Form.Item>
                    </Form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#030712] text-slate-500">Or sign up with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            onClick={() => handleOAuth('google')}
                            className="h-11 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:text-white rounded-xl flex items-center justify-center gap-2"
                        >
                            <GoogleOutlined /> Google
                        </Button>
                        <Button
                            onClick={() => handleOAuth('github')}
                            className="h-11 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:text-white rounded-xl flex items-center justify-center gap-2"
                        >
                            <GithubOutlined /> GitHub
                        </Button>
                    </div>

                    <div className="text-center text-slate-500 text-sm">
                        Already have an account?
                        <Link href="/login" className="text-indigo-400 font-bold hover:text-indigo-300 ml-1 transition-colors">
                            Log in here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
