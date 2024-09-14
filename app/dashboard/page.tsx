'use client'

import { useEffect } from 'react';
import { io } from 'socket.io-client';
export default function Dashboard() {
    useEffect(() => {
        const socket = io("http://localhost:3000");
        return () => {
            socket.disconnect();
        }
    }, [])
    return null;
}