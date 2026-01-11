'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Alert } from 'antd';
import { UserOutlined, LockOutlined, RocketOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

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

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-indigo-50 blur-3xl opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-50 blur-3xl opacity-60"></div>
            </div>

            <Card className="w-full max-w-md shadow-2xl border-0 z-10 rounded-2xl overflow-hidden relative">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-4">
                        <RocketOutlined className="text-2xl" />
                    </div>
                    <Title level={2} className="text-slate-900 mb-2 mt-0">Start Winning Clients</Title>
                    <Text className="text-slate-500 text-base">Create your free account in seconds.</Text>
                </div>

                {error && <Alert message={error} type="error" showIcon className="mb-6 rounded-lg" />}

                <Form
                    name="register_form"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your Email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-slate-400" />}
                            placeholder="Email Address"
                            className="rounded-xl py-2.5"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your Password!' },
                            { min: 6, message: 'Password must be at least 6 characters' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-slate-400" />}
                            placeholder="Password"
                            className="rounded-xl py-2.5"
                        />
                    </Form.Item>

                    <Form.Item className="mb-4">
                        <Button type="primary" htmlType="submit" className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-500 border-none rounded-xl font-semibold shadow-lg shadow-indigo-100" loading={loading}>
                            Create Account
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center mt-6 pt-6 border-t border-slate-100">
                    <Text className="text-slate-500">Already have an account? </Text>
                    <Link href="/login" className="text-indigo-600 font-medium hover:text-indigo-500 hover:underline">
                        Log in here
                    </Link>
                </div>
            </Card>
        </div>
    );
}
