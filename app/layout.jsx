import "aos/dist/aos.css";
import "@/app/globals.scss";
import Root from "@/app/context";
import Auth from "@/app/auth/context";

export const metadata = {
	title: "Lox Informatics",
	description: "Transforming Retail & E-Commerce Landscapes: Innovative Solutions and Insights for Success",
	metadataBase: new URL("https://www.loxinformatics.com"),
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" dir="ltr">
			<body>
				<Root>
					<Auth>
						{children}
					</Auth>
				</Root>
			</body>
		</html>
	);
}
