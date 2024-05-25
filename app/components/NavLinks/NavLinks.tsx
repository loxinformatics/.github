'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '#hero', icon: '' },
  { name: 'About', href: '#about', icon: '' },
  { name: 'Services', href: '#services', icon: '' },
  { name: "Contact", href: "#contact", icon: '' },
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <ul>
      {links.map((link) => {
        return (
          <li key={link.name}>
            <Link
              href={link.href}
              className={clsx(
                'nav-link scrollto ',
                {
                  'active': pathname === link.href,
                },
              )}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  )
}

export default NavLinks;