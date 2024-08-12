import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestão de Empresas",
  description: "Sistema de Gestão de Empresas e Licenças Ambientais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-800 text-gray-900">{children}</body>
    </html>
  );
}
