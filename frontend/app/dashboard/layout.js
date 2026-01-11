'use client';

import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Typography, Tag } from 'antd';
import {
    AppstoreOutlined,
    ThunderboltOutlined,
    HistoryOutlined,
    BarChartOutlined,
    DollarOutlined,
    UserOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    RocketOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export default function DashboardLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    const userMenu = (
        <Menu
            items={[
                { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
                { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true, onClick: handleLogout },
            ]} />
    );

    const menuItems = [
        {
            key: '/dashboard',
            icon: <AppstoreOutlined />,
            label: <Link href="/dashboard">Daily System</Link>,
        },
        {
            key: '/dashboard/generate',
            icon: <ThunderboltOutlined />,
            label: <Link href="/dashboard/generate">Generate Reply</Link>,
        },
        {
            key: '/dashboard/proposals',
            icon: <HistoryOutlined />,
            label: <Link href="/dashboard/proposals">Reply Log</Link>,
        },
        {
            key: '/dashboard/analytics',
            icon: <BarChartOutlined />,
            label: <Link href="/dashboard/analytics">Reply Score</Link>,
        },
        {
            key: '/dashboard/income',
            icon: <DollarOutlined />,
            label: <Link href="/dashboard/income">Income</Link>,
        },
        {
            key: '/dashboard/profile',
            icon: <SettingOutlined />,
            label: <Link href="/dashboard/profile">Settings</Link>,
        },
    ];

    return (
        <AuthGuard>
            <Layout className="min-h-screen font-sans bg-slate-50">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className="!bg-white border-r border-slate-200 z-20"
                    width={240}
                    theme="light"
                >
                    {/* Brand Area */}
                    <div className={`flex items-center h-16 mx-6 overflow-hidden ${collapsed ? 'justify-center px-0 mx-2' : ''}`}>
                        <div className="flex items-center gap-2 text-indigo-600">
                            <RocketOutlined className="text-xl" />
                            {!collapsed && (
                                <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                                    ReplyBoost
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Menu */}
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[pathname]}
                        selectedKeys={[pathname]}
                        items={menuItems}
                        className="border-none px-2 space-y-1"
                        style={{ background: 'transparent' }}
                        theme="light"
                    />
                </Sider>

                <Layout className="bg-slate-50">
                    {/* Header */}
                    <Header className="bg-white border-b border-slate-200 flex justify-between items-center px-6 sticky top-0 z-10 h-16 shadow-sm">
                        <div className="flex items-center">
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                className="text-slate-500 hover:bg-slate-100 mr-4"
                            />
                            <h2 className="text-lg font-semibold text-slate-800 m-0 hidden md:block">
                                {menuItems.find(i => i.key === pathname)?.label?.props?.children || 'Dashboard'}
                            </h2>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Current Plan:</span>
                                <Tag color="blue" className="m-0 font-semibold border-none bg-blue-100 text-blue-700">Free Team</Tag>
                            </div>

                            <Button type="primary" size="small" className="font-medium bg-indigo-600 shadow-indigo-200 shadow-sm hover:!bg-indigo-700">
                                Upgrade
                            </Button>

                            <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

                            <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
                                <div className="cursor-pointer hover:opacity-80 transition-opacity">
                                    <Avatar
                                        style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}
                                        icon={<UserOutlined />}
                                    />
                                </div>
                            </Dropdown>
                        </div>
                    </Header>

                    {/* Content */}
                    <Content
                        className="p-6 md:p-8 overflow-y-auto"
                        style={{
                            minHeight: 'calc(100vh - 64px)',
                        }}
                    >
                        <div className="max-w-6xl mx-auto">
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </AuthGuard>
    );
}
