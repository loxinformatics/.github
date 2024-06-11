import "@/app/global.scss";
import AuthContext from "@/app/auth/context";
import BaseContext from "@/app/base/context";
import { ScrollTop } from "@/widgets/ScrollTop/ScrollTop";

export const metadata = {
  title: "Lox Informatics",
  description:
    "Transforming Retail & E-Commerce Landscapes: Innovative Solutions and Insights for Success",
  metadataBase: new URL("https://www.loxinformatics.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <AuthContext>
          <BaseContext>
            {children}
            <ScrollTop />
          </BaseContext>
        </AuthContext>
      </body>
    </html>
  );
}
