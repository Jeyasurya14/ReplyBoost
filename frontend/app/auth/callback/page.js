'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { message, Spin } from 'antd';
import { RocketOutlined } from '@ant-design/icons';

function AuthLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030712]">
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-2xl shadow-indigo-500/30 mb-8 mx-auto animate-pulse">
                    <RocketOutlined />
                </div>
                <h2 className="text-white text-xl font-bold mb-4">Authenticating...</h2>
                <Spin size="large" />
            </div>
        </div>
    );
}

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (token) {
            localStorage.setItem('token', token);
            message.success('Successfully logged in!');
            router.push('/dashboard');
        } else if (error) {
            message.error('Login failed. Please try again.');
            router.push('/login');
        } else {
            // If accessed directly without params, redirect to login
            // Timeout to avoid flicker if it was just slow param access? No, params are synchronous.
            // But we might want to check if searchParams is empty.
            const hasParams = searchParams.toString().length > 0;
            if (!hasParams) {
                router.push('/login');
            }
        }
    }, [router, searchParams]);

    return <AuthLoader />;
}

export default function AuthCallback() {
    return (
        <Suspense fallback={<AuthLoader />}>
            <CallbackContent />
        </Suspense>
    );
}
