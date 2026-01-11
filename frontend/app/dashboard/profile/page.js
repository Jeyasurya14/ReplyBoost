'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Tabs, Typography, Select, message, Spin, Switch, List, Tag, Progress } from 'antd';
import { UserOutlined, SaveOutlined, CreditCardOutlined, SettingOutlined, CheckCircleFilled, SketchOutlined } from '@ant-design/icons';
import api from '@/lib/api';

const { Title, Text } = Typography;
const { Option } = Select;

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('profile');

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
            message.success('Settings updated successfully');
        } catch (error) {
            message.error('Failed to update settings');
        } finally {
            setSaving(false);
        }
    };

    const items = [
        {
            key: 'profile',
            label: <span className="flex items-center gap-2"><UserOutlined /> Profile</span>,
            children: (
                <div className="max-w-2xl">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        size="large"
                        className="mt-4"
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            <Form.Item
                                name="skill"
                                label="Primary Skill"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input placeholder="e.g. Full Stack Developer" className="saas-input" />
                            </Form.Item>

                            <Form.Item
                                name="niche"
                                label="Target Niche"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input placeholder="e.g. FinTech SaaS" className="saas-input" />
                            </Form.Item>

                            <Form.Item
                                name="platform"
                                label="Primary Platform"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Select placeholder="Select Platform" className="w-full">
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
                                <Select placeholder="Select Level" className="w-full">
                                    <Option value="Junior">Junior (1-2 years)</Option>
                                    <Option value="Mid-Level">Mid-Level (3-5 years)</Option>
                                    <Option value="Senior">Senior (5+ years)</Option>
                                    <Option value="Expert">Expert (10+ years)</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="mt-6">
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                loading={saving}
                                size="large"
                                className="bg-indigo-600 h-12 px-8 rounded-lg font-semibold hover:!bg-indigo-700 shadow-md"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </div>
            )
        },
        {
            key: 'subscription',
            label: <span className="flex items-center gap-2"><CreditCardOutlined /> Subscription</span>,
            children: (
                <div className="max-w-3xl mt-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 flex items-center justify-between">
                        <div>
                            <div className="text-slate-500 font-medium mb-1">Current Plan</div>
                            <h3 className="text-2xl font-bold text-slate-900 m-0">Free Plan</h3>
                            <div className="mt-2 text-slate-500 text-sm">Resets monthly on the 1st.</div>
                        </div>
                        <div className="text-right">
                            <div className="text-slate-500 font-medium mb-1">Credits Used</div>
                            <div className="text-2xl font-bold text-indigo-600 m-0">8 / 20</div>
                            <Progress percent={40} showInfo={false} strokeColor="#4F46E5" trailColor="#e2e8f0" className="w-32 mt-2" size="small" />
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-4">Upgrade your productivity</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border-2 border-indigo-100 rounded-xl p-6 relative overflow-hidden bg-white hover:border-indigo-200 transition-colors cursor-pointer">
                            <div className="absolute top-0 right-0 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-bl-xl font-bold text-xs uppercase">Current</div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">Free</h4>
                            <div className="text-3xl font-bold text-slate-900 mb-4">$0<span className="text-base font-normal text-slate-400">/mo</span></div>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-2 text-slate-600"><CheckCircleFilled className="text-indigo-500" /> 20 Credits / Day</li>
                                <li className="flex items-center gap-2 text-slate-600"><CheckCircleFilled className="text-indigo-500" /> Basic Templates</li>
                            </ul>
                            <Button disabled block size="large" className="bg-slate-100 text-slate-400 border-none font-semibold">Active</Button>
                        </div>

                        <div className="border-2 border-indigo-600 rounded-xl p-6 relative overflow-hidden bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-xl shadow-indigo-200">
                            <div className="absolute top-0 right-0 bg-white/20 text-white px-3 py-1 rounded-bl-xl font-bold text-xs uppercase backdrop-blur-sm">Popular</div>
                            <div className="flex items-center gap-2 mb-2"><SketchOutlined className="text-xl" /> <h4 className="font-bold text-lg m-0">Pro</h4></div>
                            <div className="text-3xl font-bold text-white mb-4">$19<span className="text-base font-normal text-indigo-200">/mo</span></div>
                            <ul className="space-y-3 mb-6 text-indigo-100">
                                <li className="flex items-center gap-2"><CheckCircleFilled className="text-white" /> Unlimited Credits</li>
                                <li className="flex items-center gap-2"><CheckCircleFilled className="text-white" /> Advanced AI Models</li>
                                <li className="flex items-center gap-2"><CheckCircleFilled className="text-white" /> Priority Support</li>
                            </ul>
                            <Button block size="large" className="bg-white text-indigo-600 border-none font-bold hover:!bg-indigo-50 hover:!text-indigo-700 h-10">Upgrade Now</Button>
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'preferences',
            label: <span className="flex items-center gap-2"><SettingOutlined /> Preferences</span>,
            children: (
                <div className="max-w-xl mt-4 space-y-6">
                    <List
                        header={<div className="font-bold text-slate-800">Notifications</div>}
                        bordered={false}
                        dataSource={[
                            { title: 'Email Summaries', desc: 'Receive weekly performance reports.' },
                            { title: 'New Features', desc: 'Get notified about platform updates.' }
                        ]}
                        renderItem={(item) => (
                            <List.Item className="!px-0 !py-4">
                                <List.Item.Meta
                                    title={<span className="text-slate-700 font-medium">{item.title}</span>}
                                    description={<span className="text-slate-500">{item.desc}</span>}
                                />
                                <Switch defaultChecked />
                            </List.Item>
                        )}
                    />

                    <List
                        header={<div className="font-bold text-slate-800">Appearance</div>}
                        bordered={false}
                        dataSource={[
                            { title: 'Dark Mode', desc: 'Switch between light and dark themes.' },
                        ]}
                        renderItem={(item) => (
                            <List.Item className="!px-0 !py-4">
                                <List.Item.Meta
                                    title={<span className="text-slate-700 font-medium">{item.title}</span>}
                                    description={<span className="text-slate-500">{item.desc}</span>}
                                />
                                <Switch disabled checked={false} className="opacity-50" />
                            </List.Item>
                        )}
                    />
                </div>
            )
        }
    ];

    if (loading) return <div className="p-12 text-center text-slate-400"><Spin /></div>;

    return (
        <div className="max-w-5xl mx-auto pb-12 animate-fade-in">
            <div className="mb-8">
                <Title level={2} className="!text-slate-900 !mb-2 tracking-tight">Settings</Title>
                <p className="text-slate-500 text-lg">Manage your profile, subscription, and preferences.</p>
            </div>

            <div className="saas-card p-6 min-h-[600px]">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={items}
                    size="large"
                    className="custom-tabs"
                />
            </div>

            <style jsx global>{`
                .custom-tabs .ant-tabs-nav::before {
                    border-bottom: 1px solid #f1f5f9 !important;
                }
                .custom-tabs .ant-tabs-tab {
                    padding: 12px 0 !important;
                    margin-right: 32px !important;
                    color: #64748b !important;
                    font-size: 1rem !important;
                }
                .custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #4F46E5 !important;
                    font-weight: 600 !important;
                }
                .custom-tabs .ant-tabs-ink-bar {
                    background: #4F46E5 !important;
                    height: 3px !important;
                    border-radius: 3px 3px 0 0 !important;
                }
            `}</style>
        </div>
    );
}
