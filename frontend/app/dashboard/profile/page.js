'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Select, message, Spin } from 'antd';
import { UserOutlined, SaveOutlined } from '@ant-design/icons';
import api from '@/lib/api';

const { Title, Text } = Typography;
const { Option } = Select;

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/users/me');
                const profile = response.data.profile || {};
                form.setFieldsValue(profile);
            } catch (error) {
                message.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [form]);

    const onFinish = async (values) => {
        setSaving(true);
        try {
            await api.put('/users/me/profile', values);
            message.success('Profile updated successfully');
        } catch (error) {
            message.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center"><Spin /></div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Title level={2}>Your Profile</Title>
                <Text type="secondary">This information is used to generate better proposals.</Text>
            </div>

            <Card className="shadow-sm rounded-xl">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="skill"
                        label="Primary Skill"
                        rules={[{ required: true, message: 'Required' }]}
                        tooltip="e.g. Web Development, Graphic Design"
                    >
                        <Input placeholder="e.g. Full Stack Developer" />
                    </Form.Item>

                    <Form.Item
                        name="niche"
                        label="Your Niche"
                        rules={[{ required: true, message: 'Required' }]}
                        tooltip="e.g. SaaS, E-commerce, Real Estate"
                    >
                        <Input placeholder="e.g. FinTech SaaS" />
                    </Form.Item>

                    <Form.Item
                        name="platform"
                        label="Primary Platform"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Select placeholder="Select Platform">
                            <Option value="Upwork">Upwork</Option>
                            <Option value="Fiverr">Fiverr</Option>
                            <Option value="Freelancer">Freelancer.com</Option>
                            <Option value="LinkedIn">LinkedIn</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="experience"
                        label="Experience Level"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Select placeholder="Select Level">
                            <Option value="Junior">Junior (1-2 years)</Option>
                            <Option value="Mid-Level">Mid-Level (3-5 years)</Option>
                            <Option value="Senior">Senior (5+ years)</Option>
                            <Option value="Expert">Expert (10+ years)</Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saving} className="bg-blue-600">
                        Save Profile
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
