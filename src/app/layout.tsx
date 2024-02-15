import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {info} from './database.json';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: info.title,
  description: info.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
