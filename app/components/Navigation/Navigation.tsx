import { useState } from 'react';
import '@/app/components/Navigation/Navigation.css'

import NavLinks from '@/app/components/NavLinks/NavLinks';


function Navigation() {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	const toggleMobileNav = () => {
		setIsMobileNavOpen(!isMobileNavOpen);
	};

	return (
		<nav id="navbar" className={`navbar order-last order-lg-0 ${isMobileNavOpen ? 'navbar-mobile' : ''}`}>
			<NavLinks></NavLinks>
			<i className={`bi ${isMobileNavOpen ? 'bi-x' : 'bi-list'} mobile-nav-toggle`} onClick={toggleMobileNav}></i>
		</nav>
	)
}

export default Navigation;