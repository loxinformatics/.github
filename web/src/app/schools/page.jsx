"use client";

import { useAuthContext } from "@/app/auth/global_context";
import PrivateRoute from "@/app/auth/global_context";
import Header, {
	Logo,
	NavBarAndMobileNavToggle,
} from "@/app/ui/header/header";

import Main from "@/app/ui/main/main";
import Button from "@/app/utils/button/button";


export default function Schools() {
	const { logoutUser } = useAuthContext();

	return (
		<PrivateRoute>

			<Header position="sticky-top">
				<div className="me-auto">
					<Logo />
				</div>
				<div className="order-last order-lg-0">
					<NavBarAndMobileNavToggle />
				</div>
				<div className="ms-auto">
					<Button name="Home" href="/#hero" />
				</div>
			</Header>

			<Main>
				<p>Schools Page</p>
				<div className="my-5 py-5">
					<button className="btn btn-danger" onClick={() => { logoutUser() }}>Logout</button>
				</div>
			</Main>

		</PrivateRoute>
	);
}