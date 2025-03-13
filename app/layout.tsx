import Header from "@/components/Header";
import "@/styles/globals.css";

export const metadata = {
  title: "Memory Vault",
  description: "A sleek, modern memory storage website",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-black text-white">
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
