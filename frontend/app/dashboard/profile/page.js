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
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <UserOutlined className="text-3xl text-white" />
                </div>
                <div>
                    <Title level={2} className="!text-white !mb-1 tracking-tight">Your Profile</Title>
                    <p className="text-slate-400 text-lg">Customize your AI&apos;s writing style and context.</p>
                </div>
            </div>

            <div className="glass-panel p-1 rounded-3xl overflow-hidden border border-white/10 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>

                <div className="p-8 md:p-10 relative z-10">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        size="large"
                        className="cosmic-form"
                    >
                        <div className="grid md:grid-cols-2 gap-8">
                            <Form.Item
                                name="skill"
                                label={<span className="text-slate-300 font-medium">Primary Skill</span>}
                                rules={[{ required: true, message: 'Required' }]}
                                tooltip={{ title: "e.g. Web Development, Graphic Design", icon: <span className="text-indigo-400">?</span> }}
                                className="mb-0"
                            >
                                <Input placeholder="e.g. Full Stack Developer" className="glass-input" />
                            </Form.Item>

                            <Form.Item
                                name="niche"
                                label={<span className="text-slate-300 font-medium">Your Niche</span>}
                                rules={[{ required: true, message: 'Required' }]}
                                tooltip={{ title: "e.g. SaaS, E-commerce, Real Estate", icon: <span className="text-indigo-400">?</span> }}
                                className="mb-0"
                            >
                                <Input placeholder="e.g. FinTech SaaS" className="glass-input" />
                            </Form.Item>

                            <Form.Item
                                name="platform"
                                label={<span className="text-slate-300 font-medium">Primary Platform</span>}
                                rules={[{ required: true, message: 'Required' }]}
                                className="mb-0"
                            >
                                <Select placeholder="Select Platform" className="glass-select" popupClassName="glass-dropdown">
                                    <Option value="Upwork">Upwork</Option>
                                    <Option value="Fiverr">Fiverr</Option>
                                    <Option value="Freelancer">Freelancer.com</Option>
                                    <Option value="LinkedIn">LinkedIn</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="experience"
                                label={<span className="text-slate-300 font-medium">Experience Level</span>}
                                rules={[{ required: true, message: 'Required' }]}
                                className="mb-0"
                            >
                                <Select placeholder="Select Level" className="glass-select" popupClassName="glass-dropdown">
                                    <Option value="Junior">Junior (1-2 years)</Option>
                                    <Option value="Mid-Level">Mid-Level (3-5 years)</Option>
                                    <Option value="Senior">Senior (5+ years)</Option>
                                    <Option value="Expert">Expert (10+ years)</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/10 flex justify-end">
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                loading={saving}
                                size="large"
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none h-12 px-8 rounded-xl font-bold shadow-lg shadow-indigo-500/25 hover:!scale-[1.02] active:!scale-[0.98] transition-all"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

            <style jsx global>{`
                .glass-input {
                    background-color: rgba(255, 255, 255, 0.03) !important;
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    color: white !important;
                    border-radius: 0.75rem !important;
                    height: 3.5rem !important;
                    padding: 0 1rem !important;
                    font-size: 1rem !important;
                }
                .glass-input:hover, .glass-input:focus {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    border-color: #6366f1 !important;
                    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
                }
                .glass-input::placeholder {
                    color: rgba(255, 255, 255, 0.2) !important;
                }
                
                .glass-select .ant-select-selector {
                    background-color: rgba(255, 255, 255, 0.03) !important;
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    color: white !important;
                    border-radius: 0.75rem !important;
                    height: 3.5rem !important;
                    display: flex !important;
                    align-items: center !important;
                    padding: 0 1rem !important;
                }
                 .glass-select:hover .ant-select-selector, .glass-select.ant-select-focused .ant-select-selector {
                    border-color: #6366f1 !important;
                     box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
                }
                .glass-select .ant-select-arrow {
                    color: rgba(255, 255, 255, 0.5) !important;
                }
                .glass-select .ant-select-selection-placeholder {
                    color: rgba(255, 255, 255, 0.2) !important;
                }
            `}</style>
        </div>
    );
}
