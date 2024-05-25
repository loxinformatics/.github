'use client';

// import Image from 'next/image';
import Link from 'next/link';
import '@/app/components/Logo/Logo.css';

function Logo() {
  return (
    <Link href="/" target="_blank" rel="noreferrer" className="logo me-auto me-lg-0">

      <h1>Lox<span>.</span></h1>

      {/* Uncomment below if you prefer to use an image logo */}

      {/* <Image
        src="/images/logo.jpg"
        width={512}
        height={454}
        alt="logo"
        className="img-fluid"
      /> */}

    </Link>
  )
}

export default Logo