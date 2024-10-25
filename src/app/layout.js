import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Footloosemonkey",
  description: "Join Footloosemonkey, the ultimate talent competition for kids aged 6-12! Showcase your skills in dancing, singing, acting, and more in a fun, encouraging environment. Discover and celebrate young talents today!"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Join Footloosemonkey, the ultimate talent competition for kids aged 6-12! Showcase your skills in dancing, singing, acting, and more in a fun, encouraging environment. Discover and celebrate young talents today!" />
        <meta name="keywords" content="Footloosemonkey, talent competition, kids talent, singing competition, dancing competition" />
        <meta name="author" content="A&W Technologies" />

        {/* Open Graph Tags for Social Sharing */}
        <meta property="og:title" content="Footloosemonkey - Where Young Talents Shine" />
        <meta property="og:description" content="Join Footloosemonkey, the ultimate talent competition for kids aged 6-12! Showcase your skills in dancing, singing, acting, and more in a fun, encouraging environment. Discover and celebrate young talents today!" />
        <meta property="og:image" content="/img/og-image.png" />
        <meta property="og:url" content="https://www.footloosemonkey.club" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Footloosemonkey - Where Young Talents Shine" />
        <meta name="twitter:description" content="Join Footloosemonkey, the ultimate talent competition for kids aged 6-12! Showcase your skills in dancing, singing, acting, and more in a fun, encouraging environment. Discover and celebrate young talents today!" />
        <meta name="twitter:image" content="/img/twitter-image.png" />

        {/* Favicon and Icons */}
        <link rel="icon" href="Favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="Favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="Favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="Favicon/android-chrome-512x512.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

        {/* Page Title */}
        <title>Footloosemonkey</title>
      </head>

      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />

        {/* Razorpay Script */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </html>
  );
}
