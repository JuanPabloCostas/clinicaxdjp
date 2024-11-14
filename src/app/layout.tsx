import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const font = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bolsa de trabajo UAQ",
  description: "Plataforma para buscar empleo y/o colaboradores. Principalmente dirigido a comunidad UAQ",
  keywords: ["Empleo", "Colaboradores", "Empresas", "Trabajo", "UAQ", "Carreras UAQ", "Querétaro"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`antialiased bg-slate-100 dark:bg-gray-950`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={font.className}><main>{children}</main></body>
    </html>
  );
}