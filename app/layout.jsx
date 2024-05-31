import RootContextProvider from "./context";
import "./globals.scss";

import Preloader from "@/components/widgets/Preloader/Preloader";
import ScrollTopBtn from "@/components/widgets/ScrollTopBtn/ScrollTopBtn";

export const metadata = {
	title: "Lox Informatics",
	description: "Transforming Retail & E-Commerce Landscapes: Innovative Solutions and Insights for Success",
	metadataBase: new URL("https://www.loxinformatics.com"),
};

export default function RootLayout({ children }) {

	return (
		<html lang="en" dir="ltr">
			<body>
				<RootContextProvider>{children}</RootContextProvider>
				<ScrollTopBtn />
				<Preloader />
			</body>
		</html>
	);

}
