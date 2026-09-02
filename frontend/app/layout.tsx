import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NLW IA - Chat com IA",
  description: "Plataforma de chat com inteligência artificial usando RAG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-background antialiased">
        <div className="mx-auto min-h-screen max-w-6xl">{children}</div>
      </body>
    </html>
  );
}
