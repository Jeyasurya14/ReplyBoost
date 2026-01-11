'use client';

import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, Button, message, Input, Select, Tooltip } from 'antd';
import { CopyOutlined, SearchOutlined, FilterOutlined, EyeOutlined } from '@ant-design/icons';
import api from '@/lib/api';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

export default function ProposalsPage() {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [platformFilter, setPlatformFilter] = useState('All');

    useEffect(() => {
        fetchProposals();
    }, []);

    const fetchProposals = async () => {
        try {
            const response = await api.get('/proposals');
            setProposals(response.data);
        } catch (error) {
            message.error('Failed to load proposals');
        } finally {
            setLoading(false);
        }
    };

    const filteredProposals = proposals.filter(p => {
        const matchesSearch = p.job_description?.toLowerCase().includes(searchText.toLowerCase()) ||
            p.proposal_text?.toLowerCase().includes(searchText.toLowerCase());
        const matchesPlatform = platformFilter === 'All' || p.platform === platformFilter;
        return matchesSearch && matchesPlatform;
    });

    const columns = [
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => <span className="text-slate-500 font-medium">{dayjs(date).format('MMM D, YYYY')}</span>,
            width: 120,
        },
        {
            title: 'Proposal',
            dataIndex: 'job_description',
            key: 'job_description',
            render: (text, record) => (
                <div>
                    <div className="font-semibold text-slate-800 text-sm mb-1 truncate max-w-md">
                        {text ? text.substring(0, 60) + "..." : "Generated Proposal"}
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag color={record.platform === 'Upwork' ? 'green' : 'blue'} className="mr-0 rounded-md text-[10px] font-bold border-none px-1.5 py-0.5 uppercase">
                            {record.platform}
                        </Tag>
                        <span className="text-xs text-slate-400">
                            {record.proposal_text ? `${record.proposal_text.split(' ').length} words` : ''}
                        </span>
                    </div>
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status, record) => (
                <Select
                    defaultValue={status || 'generated'}
                    size="small"
                    className="w-28"
                    bordered={false}
                    onChange={async (value) => {
                        try {
                            await api.put(`/proposals/${record.id}/status`, { status: value });
                            message.success('Status updated');
                        } catch (e) {
                            message.error('Failed to update');
                        }
                    }}
                >
                    <Option value="generated"><Tag color="default" className="w-full text-center m-0">Draft</Tag></Option>
                    <Option value="sent"><Tag color="blue" className="w-full text-center m-0">Sent</Tag></Option>
                    <Option value="replied"><Tag color="success" className="w-full text-center m-0">Replied</Tag></Option>
                </Select>
            )
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <div className="flex gap-2">
                    <Tooltip title="Copy to Clipboard">
                        <Button
                            icon={<CopyOutlined />}
                            size="small"
                            type="text"
                            className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                            onClick={() => {
                                navigator.clipboard.writeText(record.proposal_text);
                                message.success('Copied!');
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="View Details">
                        <Button
                            icon={<EyeOutlined />}
                            size="small"
                            type="text"
                            className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-12 animate-fade-in">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <Title level={2} className="!text-slate-900 !mb-2 tracking-tight">Reply Log</Title>
                    <p className="text-slate-500 text-lg">Track, manage, and optimize your outreach.</p>
                </div>
                <div className="flex gap-3">
                    <Input
                        placeholder="Search proposals..."
                        prefix={<SearchOutlined className="text-slate-400" />}
                        className="w-full md:w-64 !bg-white !border-slate-200 !rounded-lg"
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <Select
                        defaultValue="All"
                        className="w-32"
                        onChange={setPlatformFilter}
                        size="middle"
                    >
                        <Option value="All">All Platforms</Option>
                        <Option value="Upwork">Upwork</Option>
                        <Option value="Fiverr">Fiverr</Option>
                    </Select>
                </div>
            </div>

            <div className="saas-card overflow-hidden">
                <Table
                    columns={columns}
                    dataSource={filteredProposals}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: false,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                    }}
                    rowClassName="hover:bg-slate-50 transition-colors"
                />
            </div>
        </div>
    );
}
