import type { Metadata, Viewport } from "next";
import { CatalogWorker } from "./components/CatalogWorker";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zummo Textil | Ropa de Egresados",
  description:
    "Camperas, buzos, chombas, gorras y mucho mas para promociones. Zummo Textil, 20 anos de trayectoria y envios a todo el pais.",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "Zummo",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f3ec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <CatalogWorker />
      </body>
    </html>
  );
}
