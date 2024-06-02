"use client";

import { useRoot } from "../context";
import { PrivateRoute, useAuth } from "../auth/context";
import Header from "@/app/ui/Header/Header";
import Footer from "@/app/ui/Footer/Footer";


export default function Schools() {

	const { root } = useRoot();
	const { logoutUser } = useAuth();

	return (
		<PrivateRoute>
			<Header />
			<main id="main">
				<p>Schools Page</p>
				<div className="my-5 py-5">
					<button className="btn btn-danger" onClick={() => { logoutUser() }}>Logout</button>
				</div>
			</main>
			<Footer root={root}></Footer>
		</PrivateRoute>
	);
}