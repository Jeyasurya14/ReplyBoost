'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, message } from 'antd';
import { UserOutlined, LockOutlined, RocketOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

const { Title, Text } = Typography;

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const onFinish = async (values) => {
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/register', {
                email: values.email,
                password: values.password,
            });
            message.success('Registration successful! Please log in.');
            router.push('/login');
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md shadow-lg rounded-2xl border-0 overflow-hidden">
                <div className="text-center mb-8 mt-4">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-600 text-white p-2 rounded-xl">
                            <RocketOutlined style={{ fontSize: '24px' }} />
                        </div>
                    </div>
                    <Title level={2} className="mb-2">Create Account</Title>
                    <Text type="secondary">Start getting more replies today</Text>
                </div>

                {error && <Alert message={error} type="error" showIcon className="mb-6" />}

                <Form
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Invalid email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }, { min: 6, message: 'Password must be at least 6 characters' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading} className="bg-blue-600 h-12 text-lg font-medium">
                            Sign up
                        </Button>
                    </Form.Item>

                    <div className="text-center mt-4">
                        <Text type="secondary">Already have an account? </Text>
                        <Link href="/login" className="text-blue-600 font-medium hover:text-blue-500">
                            Log in
                        </Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
}
