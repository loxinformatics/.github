import "./global.scss"
import AuthContext from "@/app/auth/global_context";
import ScrollTop from "@/app/utils/scrolltop/scrolltop";

export const metadata = {
	title: "Lox Informatics",
	description: "Transforming Retail & E-Commerce Landscapes: Innovative Solutions and Insights for Success",
	metadataBase: new URL("https://www.loxinformatics.com"),
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" dir="ltr">
			<body>
				<AuthContext>
					{children}
					<ScrollTop />
				</AuthContext>
			</body>
		</html>
	);
}
