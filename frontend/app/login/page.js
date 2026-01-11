'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Alert } from 'antd';
import { UserOutlined, LockOutlined, RocketOutlined, GoogleOutlined, GithubOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onFinish = async (values) => {
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/login', {
                email: values.email,
                password: values.password
            });

            localStorage.setItem('token', response.data.access_token);
            message.success('Welcome back!');
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
            let errorMessage = 'Login failed';
            const detail = err.response?.data?.detail;

            if (detail) {
                if (typeof detail === 'string') {
                    errorMessage = detail;
                } else if (Array.isArray(detail)) {
                    errorMessage = detail.map(e => e.msg || JSON.stringify(e)).join(', ');
                } else if (typeof detail === 'object') {
                    errorMessage = detail.msg || JSON.stringify(detail);
                }
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#030712] text-slate-200 font-sans">
            {/* Left Side - Cosmic Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 justify-center items-center p-12">
                <div className="absolute inset-0 bg-indigo-900/20 z-0"></div>
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-indigo-600/20 rounded-full blur-[100px] animate-[pulse_8s_infinite]"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-violet-600/20 rounded-full blur-[100px] animate-[pulse_10s_infinite]"></div>

                <div className="relative z-10 max-w-lg">
                    <div className="mb-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-2xl shadow-indigo-500/30 mb-8">
                            <RocketOutlined />
                        </div>
                        <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
                            Win More Jobs <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">With AI Magic</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            "I went from a 5% reply rate to over 30% in just one week. ReplyBoost paid for itself in my first job."
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs">
                                    <UserOutlined />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm font-medium text-slate-400">Join 10,000+ freelancers</div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-24 relative">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-slate-500">Enter your credentials to access your account</p>
                    </div>

                    {error && <Alert message={error} type="error" showIcon className="bg-red-500/10 border border-red-500/20 text-red-200" />}

                    <Form
                        name="login_form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                        className="space-y-4"
                    >
                        <Form.Item
                            name="email"
                            label={<span className="text-slate-400">Email Address</span>}
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="text-slate-500" />}
                                placeholder="name@example.com"
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 hover:bg-white/10 hover:border-indigo-500/50 focus:bg-white/10 focus:border-indigo-500 h-12 rounded-xl"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={<span className="text-slate-400">Password</span>}
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-slate-500" />}
                                placeholder="••••••••"
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 hover:bg-white/10 hover:border-indigo-500/50 focus:bg-white/10 focus:border-indigo-500 h-12 rounded-xl"
                            />
                        </Form.Item>

                        <div className="flex items-center justify-between text-sm">
                            <a className="text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
                        </div>

                        <Form.Item className="pt-4">
                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-500 border-none rounded-xl font-bold shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2"
                                >
                                    Sign In <ArrowRightOutlined />
                                </Button>
                            </motion.div>
                        </Form.Item>
                    </Form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#030712] text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button className="h-11 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:text-white rounded-xl flex items-center justify-center gap-2">
                            <GoogleOutlined /> Google
                        </Button>
                        <Button className="h-11 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:text-white rounded-xl flex items-center justify-center gap-2">
                            <GithubOutlined /> GitHub
                        </Button>
                    </div>

                    <div className="text-center text-slate-500 text-sm">
                        Don&apos;t have an account?
                        <Link href="/register" className="text-indigo-400 font-bold hover:text-indigo-300 ml-1 transition-colors">
                            Sign up for free
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
