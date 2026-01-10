'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';

export default function AuthGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Check if we are on client side
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
            } else {
                setAuthorized(true);
            }
        }
    }, [router]);

    if (!authorized) {
        return (
            <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
                <Spin size="large" tip="Loading..." />
            </div>
        );
    }

    return children;
}
