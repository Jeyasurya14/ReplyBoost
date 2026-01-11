'use client';

import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Avatar, Dropdown, Typography } from 'antd';
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
            <Layout className="min-h-screen font-sans">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className="shadow-xl z-20"
                    width={260}
                    style={{ background: '#fff' }}
                >
                    <div className="flex items-center justify-center h-20 border-b border-gray-100/50 mx-4 mb-2">
                        <div className={`transition-all duration-300 flex items-center gap-2 text-indigo-600 ${collapsed ? 'justify-center' : ''}`}>
                            <RocketOutlined className="text-2xl" />
                            {!collapsed && <span className="font-bold text-xl tracking-tight text-slate-800">ReplyBoost</span>}
                        </div>
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={[pathname]}
                        selectedKeys={[pathname]}
                        items={menuItems}
                        className="border-none px-3"
                        itemIcon={<span className="text-lg" />}
                        style={{
                            fontSize: '15px',
                            fontWeight: 500,
                        }}
                    />
                    {!collapsed && (
                        <div className="absolute bottom-8 left-0 w-full px-6">
                            <div className="bg-indigo-50 rounded-xl p-4 text-center">
                                <Text className="block text-indigo-900 font-semibold mb-1">Pro Plan</Text>
                                <Text className="block text-indigo-600/70 text-xs mb-3">Get unlimited generates</Text>
                                <Button size="small" type="primary" className="bg-indigo-600 w-full rounded-lg shadow-md shadow-indigo-200 border-none">Upgrade</Button>
                            </div>
                        </div>
                    )}
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} className="flex justify-between items-center px-6 shadow-sm border-b border-gray-100 z-10 sticky top-0 h-20">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '18px',
                                width: 48,
                                height: 48,
                            }}
                            className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl"
                        />
                        <div className="flex items-center gap-4">
                            <Button type="text" shape="circle" icon={<ThunderboltOutlined />} className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50" />
                            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                            <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
                                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 pl-2 pr-4 py-1.5 rounded-full transition-all border border-transparent hover:border-gray-200">
                                    <Avatar size="large" icon={<UserOutlined />} className="bg-gradient-to-br from-indigo-500 to-purple-500" />
                                    <div className="hidden md:block text-left">
                                        <div className="text-sm font-semibold text-slate-700 leading-tight">Freelancer</div>
                                        <div className="text-xs text-slate-400">Basic Plan</div>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        className="p-6 md:p-8 overflow-y-auto bg-slate-50/50"
                        style={{
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </AuthGuard>
    );
}
