import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import "./theme-config.css";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import NavBar from "./NavBar";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Saloon System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {/*ye body tag ka part hy className={`${geistSans.variable} ${geistMono.variable} antialiased`} */}
        <Theme appearance="light" accentColor="violet">
          <NavBar />
          <main className="p-5">
            <Container>{children}</Container>
          </main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
