import "./globals.scss"
import RootContext from "@/app/context";
import AuthContext from "@/app/auth/context";
import ScrollTopBtn from "@/app/ui/scrolltopbtn/scrolltopbtn";

export const metadata = {
	title: "Lox Informatics",
	description: "Transforming Retail & E-Commerce Landscapes: Innovative Solutions and Insights for Success",
	metadataBase: new URL("https://www.loxinformatics.com"),
};


export default function RootLayout({ children }) {
	return (
		<html lang="en" dir="ltr">
			<body>
				<RootContext>
					<AuthContext>
						{children}
						<ScrollTopBtn />
					</AuthContext>
				</RootContext>
			</body>
		</html>
	);
}
