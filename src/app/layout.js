import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Footloosemonkey",
  description: "Join Footloosemonkey, the ultimate talent competition for kids aged 5-15! Showcase your skills in dancing, singing, acting, and more in a fun, encouraging environment. Discover and celebrate young talents today!"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Images */}
        <link rel="icon" href="Favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="Favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="Favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="Favicon/android-chrome-512x512.png" />
        {/* Meta Tags */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="..." />
        <meta name="keywords" content="..." />
        <meta name="author" content="..." />
        <meta property="og:title" content="Footloosemonkey - Where Young Talents Shine" />
        <meta property="og:description" content="..." />
        <meta property="og:image" content="/img/og-image.png" />
        <meta property="og:url" content="https://www.footloosemonkey.club" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Footloosemonkey - Where Young Talents Shine" />
        <meta name="twitter:description" content="..." />
        <meta name="twitter:image" content="/img/twitter-image.png" />
        <title>Footloosemonkey</title>
      </head>

      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </html>
  );
}
