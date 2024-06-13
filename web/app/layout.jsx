import RootContext from "./context";
import "@/app/global.scss";

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
        <RootContext>{children}</RootContext>
      </body>
    </html>
  );
}
