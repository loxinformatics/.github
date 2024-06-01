"use client";

import { PrivateRoute } from "../auth/context";
import Header from "@/app/ui/Header/Header";
import Footer from "@/app/ui/Footer/Footer";
import Link from "next/link";
import { useRootContext } from "../context";

export default function Schools() {

	const { root } = useRootContext();

	return (
		<PrivateRoute>
			<Header />
			<main id="main">
				<p>Schools Page</p>
				<div className="my-5 py-5">
					<Link href="/auth/logout" className="btn btn-danger">Logout</Link>
				</div>
			</main>
			<Footer root={root}></Footer>
		</PrivateRoute>
	);
}