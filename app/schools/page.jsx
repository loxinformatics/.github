"use client";

import { useAuthcontext } from "@/app/auth/context";

import Header from "@/app/ui/header/header";
import Logo from "@/app/ui/header/logo/logo";
import ForwardBtn from "@/app/ui/header/forwardbtn/forwardbtn";
import NavBarAndMobileNavToggle from "@/app/ui/header/navbar/navbar";

import PrivateRoute from "@/app/auth/ui/utils/privateroute";


export default function Schools() {
	const { logoutUser } = useAuthcontext();

	return (
		<PrivateRoute>

			<Header isInnerpage={true}>
				<div className="me-auto">
					<Logo />
				</div>
				<div className="order-last order-lg-0">
					<NavBarAndMobileNavToggle />
				</div>
				<div className="ms-auto">
					<ForwardBtn name="Home" href="/#hero" />
				</div>
			</Header>

			<main id="main">
				<p>Schools Page</p>
				<div className="my-5 py-5">
					<button className="btn btn-danger" onClick={() => { logoutUser() }}>Logout</button>
				</div>
			</main>

		</PrivateRoute>
	);
}