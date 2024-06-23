import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProviders from "./provider";
import Header from "@/components/nav/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini LLM UI",
  description: "pickles your brain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-dvh bg-background text-foreground">
        <AppProviders>
          <Header />
          <main className="pt-12">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
