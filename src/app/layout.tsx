import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zummo Textil | Ropa de Egresados",
  description:
    "Camperas, buzos, chombas, gorras y mucho mas para promociones. Zummo Textil, 20 anos de trayectoria y envios a todo el pais.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
