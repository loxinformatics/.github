'use client';

import Link from 'next/link';
import '@/app/components/ForwardBtn/ForwardBtn.css'

function ForwardBtn({ name, href }: { name: string; href: string }) {
    return (
        <Link href={href} className="forward-btn scrollto">{name}</Link>
    )
}

export default ForwardBtn;
