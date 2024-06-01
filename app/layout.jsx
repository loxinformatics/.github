import "aos/dist/aos.css";
import "./globals.scss";
import RootContextProvider from "./context";
import AuthContextProvider from "./auth/context";
import ScrollTopBtn from "@/app/ui/ScrollTopBtn/ScrollTopBtn";

export const metadata = {
	title: "Lox Informatics",
	description: "Transforming Retail & E-Commerce Landscapes: Innovative Solutions and Insights for Success",
	metadataBase: new URL("https://www.loxinformatics.com"),
};

export default function RootLayout({ children }) {

	return (
		<html lang="en" dir="ltr">
			<body>
				<RootContextProvider>
					<AuthContextProvider>
						{children}
						<ScrollTopBtn />
					</AuthContextProvider>
				</RootContextProvider>

			</body>
		</html>
	);
}
