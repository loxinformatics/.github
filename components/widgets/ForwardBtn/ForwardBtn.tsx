'use client';

import Link from 'next/link';
import './ForwardBtn.css'


export default function ForwardBtn({ name, href }: { name: string; href: string }) {
    return (
        <Link href={href} className="forward-btn scrollto">{name}</Link>
    )
}
