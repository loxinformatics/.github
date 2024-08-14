import AppContext from "@/app/context";

export const metadata = {
  title: process.env.NEXT_PUBLIC_FULL_NAME,
  description: "",
  metadataBase: new URL(`https://${process.env.NEXT_PUBLIC_DOMAIN || ""}`),
};

export default function AppLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppContext>{children}</AppContext>
      </body>
    </html>
  );
}
