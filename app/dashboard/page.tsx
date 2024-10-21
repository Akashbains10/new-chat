'use client'

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
export default function Dashboard() {
    const { data } = useSession();
    useEffect(() => {
        const socket = io("http://localhost:3000", {
            auth: {
                userId: data?._id
            }
        });
        return () => {
            socket.disconnect();
        }
    }, [])
    return null;
}