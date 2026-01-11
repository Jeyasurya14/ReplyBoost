'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Alert } from 'antd';
import { UserOutlined, LockOutlined, RocketOutlined } from '@ant-design/icons';
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
                    // Handle Pydantic validation errors (array of objects)
                    errorMessage = detail.map(e => e.msg || JSON.stringify(e)).join(', ');
                } else if (typeof detail === 'object') {
                    // Handle single object error
                    errorMessage = detail.msg || JSON.stringify(detail);
                }
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-100 blur-3xl opacity-50 pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-blue-100 blur-3xl opacity-50 pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden relative">
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                            className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-4"
                        >
                            <RocketOutlined className="text-2xl" />
                        </motion.div>
                        <Title level={2} className="text-slate-900 mb-2 mt-0">Welcome Back</Title>
                        <Text className="text-slate-500 text-base">Sign in to continue to ReplyBoost</Text>
                    </div>

                    {error && <Alert message={error} type="error" showIcon className="mb-6 rounded-lg" />}

                    <Form
                        name="login_form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="text-slate-400" />}
                                placeholder="Email Address"
                                className="rounded-xl py-2.5 transition-all hover:border-indigo-400 focus:border-indigo-600 focus:shadow-sm"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-slate-400" />}
                                placeholder="Password"
                                className="rounded-xl py-2.5 transition-all hover:border-indigo-400 focus:border-indigo-600 focus:shadow-sm"
                            />
                        </Form.Item>

                        <Form.Item className="mb-4">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button type="primary" htmlType="submit" className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-500 border-none rounded-xl font-semibold shadow-lg shadow-indigo-100" loading={loading}>
                                    Log in
                                </Button>
                            </motion.div>
                        </Form.Item>
                    </Form>

                    <div className="text-center mt-6 pt-6 border-t border-slate-100">
                        <Text className="text-slate-500">Don&apos;t have an account? </Text>
                        <Link href="/register" className="text-indigo-600 font-medium hover:text-indigo-500 hover:underline">
                            Sign up for free
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
