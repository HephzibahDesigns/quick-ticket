import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/toast-provider";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Quick Ticket Support",
  description: "Get support for your product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${poppinsSans.variable} antialiased`}
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
