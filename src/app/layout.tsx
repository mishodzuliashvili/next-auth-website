import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { NextAuthProvider } from "./providers";

const font = Raleway({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Re-Next-Auth",
  description: "Website for Task 4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
