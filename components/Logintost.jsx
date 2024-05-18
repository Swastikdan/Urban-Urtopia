"use client"
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'; 

export default function Logintost({ logintype, login }) {
    const router = useRouter();

    useEffect(() => {
        if ((logintype === 'google' || logintype === 'github') && login === 'true') {
            toast.success('Logged in successfully');
            router.replace('/');
        }
    }, [logintype, login]);

    return (
        <></>
    )
}