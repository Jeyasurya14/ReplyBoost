'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Button, Typography, theme } from 'antd';
import { ArrowUpOutlined, ThunderboltOutlined, FileTextOutlined, EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function Dashboard() {
    const {
        token: { colorPrimary },
    } = theme.useToken();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <Title level={2} className="mb-0">Dashboard</Title>
                    <Text type="secondary">Welcome back, Freelancer!</Text>
                </div>
                <Link href="/dashboard/generate">
                    <Button type="primary" icon={<ThunderboltOutlined />} size="large" className="bg-blue-600 shadow-md shadow-blue-200">
                        Generate New Reply
                    </Button>
                </Link>
            </div>

            <Row gutter={[16, 16]} className="mb-8">
                <Col xs={24} md={8}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="Proposals Sent (Today)"
                            value={0}
                            precision={0}
                            valueStyle={{ color: colorPrimary }}
                            prefix={<FileTextOutlined />}
                            suffix="/ 1"
                        />
                        <Button type="link" size="small" className="p-0 mt-2">Upgrade limit</Button>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="Reply Rate"
                            value={0}
                            precision={1}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                        <Text type="secondary" className="text-xs">Based on manually tracked replies</Text>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="Total Earned"
                            value={0}
                            precision={2}
                            prefix="$"
                            valueStyle={{ color: '#3f8600' }}
                        />
                        <Text type="secondary" className="text-xs">Reported income</Text>
                    </Card>
                </Col>
            </Row>

            <Title level={4} className="mb-4">Recent Proposals</Title>
            <Card className="text-center py-16 bg-gray-50 border-dashed border-2 border-gray-200" bordered={false}>
                <Text type="secondary" className="block mb-4 text-lg">No proposals sent yet. Start sending to win clients!</Text>
                <div className="mt-2">
                    <Link href="/dashboard/generate">
                        <Button type="primary" size="large">Generate First Reply</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
