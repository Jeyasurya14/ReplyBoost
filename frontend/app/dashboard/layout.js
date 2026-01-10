'use client';

import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Avatar, Dropdown } from 'antd';
import {
    AppstoreOutlined,
    ThunderboltOutlined,
    HistoryOutlined,
    BarChartOutlined,
    DollarOutlined,
    UserOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    const userMenu = (
        <Menu items={[
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
            <Layout className="min-h-screen">
                <Sider trigger={null} collapsible collapsed={collapsed} theme="light" className="border-r border-gray-100 shadow-sm">
                    <div className="demo-logo-vertical p-4 flex items-center justify-center h-16 border-b border-gray-50">
                        <span className={`font-bold text-xl text-blue-600 ${collapsed ? 'hidden' : 'block'}`}>ReplyBoost</span>
                        {collapsed && <span className="font-bold text-xl text-blue-600">RB</span>}
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={[pathname]}
                        selectedKeys={[pathname]}
                        items={menuItems}
                        className="border-none mt-2"
                    />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} className="flex justify-between items-center px-4 border-b border-gray-100 shadow-sm sticky top-0 z-10">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className="pr-6">
                            <Dropdown overlay={userMenu} placement="bottomRight">
                                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-1 rounded-lg transition-colors">
                                    <Avatar icon={<UserOutlined />} className="bg-blue-600" />
                                    <span className="font-medium">User</span>
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </AuthGuard>
    );
}
