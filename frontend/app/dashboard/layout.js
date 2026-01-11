'use client';

import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Avatar, Dropdown, Typography, Badge } from 'antd';
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
    RocketOutlined,
    BellOutlined
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
            className="glass-panel border border-white/10 !bg-[#111827] text-slate-200"
            items={[
                { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
                { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true, onClick: handleLogout },
            ]} />
    );

    const menuItems = [
        {
            key: '/dashboard',
            icon: <AppstoreOutlined />,
            label: <Link href="/dashboard">Dashboard</Link>,
        },
        {
            key: '/dashboard/generate',
            icon: <ThunderboltOutlined />,
            label: <Link href="/dashboard/generate">Generate Reply</Link>,
        },
        {
            key: '/dashboard/proposals',
            icon: <HistoryOutlined />,
            label: <Link href="/dashboard/proposals">History</Link>,
        },
        {
            key: '/dashboard/analytics',
            icon: <BarChartOutlined />,
            label: <Link href="/dashboard/analytics">Analytics</Link>,
        },
        {
            key: '/dashboard/income',
            icon: <DollarOutlined />,
            label: <Link href="/dashboard/income">Income</Link>,
        },
    ];

    return (
        <AuthGuard>
            <Layout className="min-h-screen font-sans bg-transparent">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className="!bg-slate-900/40 backdrop-blur-xl border-r border-white/5 z-20"
                    width={260}
                    style={{ background: 'transparent' }}
                >
                    {/* Logo Area */}
                    <div className={`flex items-center h-20 mx-6 mb-6 overflow-hidden ${collapsed ? 'justify-center px-0' : ''}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                                <RocketOutlined className="text-xl text-white" />
                            </div>
                            {!collapsed && (
                                <span className="font-display font-bold text-2xl tracking-tight text-white animate-in fade-in duration-300">
                                    Reply<span className="text-indigo-400">Boost</span>
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
                        className="bg-transparent border-none px-3 space-y-1"
                        itemIcon={<span className="text-lg" />}
                        style={{
                            background: 'transparent',
                            color: '#94a3b8'
                        }}
                        theme="dark"
                    />

                    {/* Upgrade Card */}
                    {!collapsed && (
                        <div className="absolute bottom-8 left-0 w-full px-6">
                            <div className="relative overflow-hidden rounded-2xl p-5 group border border-indigo-500/20">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-md"></div>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-[40px] -mr-10 -mt-10 animate-pulse-slow"></div>

                                <div className="relative z-10">
                                    <Text className="block text-white font-bold mb-1 text-lg">Pro Plan</Text>
                                    <Text className="block text-indigo-200/70 text-xs mb-4">Unlimited generates & analytics</Text>
                                    <Button
                                        size="small"
                                        type="primary"
                                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 border-none hover:opacity-90 shadow-lg shadow-indigo-500/20 h-9 font-medium rounded-lg"
                                    >
                                        Upgrade Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Sider>

                <Layout className="bg-transparent">
                    {/* Header */}
                    <Header className="bg-transparent backdrop-blur-sm flex justify-between items-center px-6 md:px-8 sticky top-0 z-10 h-20">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl w-10 h-10 flex items-center justify-center p-0 transition-colors"
                        />

                        <div className="flex items-center gap-6">
                            <Badge dot color="#a855f7" offset={[-4, 4]}>
                                <Button type="text" shape="circle" icon={<BellOutlined />} className="text-slate-400 hover:text-white hover:bg-white/5 transition-colors" />
                            </Badge>

                            <div className="h-6 w-[1px] bg-white/10"></div>

                            <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
                                <div className="flex items-center gap-3 cursor-pointer group">
                                    <div className="p-[2px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                                        <Avatar
                                            size="default"
                                            style={{ backgroundColor: '#1e293b' }}
                                            icon={<UserOutlined className="text-indigo-400" />}
                                            className="border-2 border-[#030712]"
                                        />
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">Freelancer</div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Basic Plan</div>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                    </Header>

                    {/* Content */}
                    <Content
                        className="p-6 md:p-8 overflow-y-auto"
                        style={{
                            minHeight: 'calc(100vh - 80px)',
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </AuthGuard>
    );
}
