"use client";

import styles from "./footer.module.css";
import { createContext, useContext } from "react";
import { useRootcontext } from "@/app/context";

const FooterContext = createContext(null);


export default function Footer({ children }) {
	const { root } = useRootcontext();
	
	const {
		name,
		description,
		primary_phone,
		secondary_phone,
		primary_email,
		secondary_email,
		facebook,
		twitter_x,
		instagram,
		whatsapp,
		linkedin } = root;

	const contextData = {
		name: name,
		description: description,
		primary_phone: primary_phone,
		secondary_phone: secondary_phone,
		primary_email: primary_email,
		secondary_email: secondary_email,
		facebook: facebook,
		twitter_x: twitter_x,
		instagram: instagram,
		whatsapp: whatsapp,
		linkedin: linkedin,
	};

	return (
		<FooterContext.Provider value={contextData}>
			<footer id="footer" className={styles.footer}>
				<div className="container">
					<div className="row">
						{children}
					</div>
				</div>
			</footer>
		</FooterContext.Provider>

	)
}

// Custom hook to use the Footer context
export function useFootercontext() {
	return useContext(FooterContext);
}