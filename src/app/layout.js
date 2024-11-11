import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Script from 'next/script';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adsense from "../components/Adsense";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Footloosemonkey",
  description: "Join Footloosemonkey, the ultimate talent competition for kids aged 6-12! Showcase your skills in dancing, singing, acting, and more in a fun, encouraging environment. Discover and celebrate young talents today!",
  siteUrl: "https://www.footloosemonkey.club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Adsense Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8590034113156778" crossOrigin="anonymous"></script>
        {/* Adsense Populate */}
        <Adsense pId="ca-pub-8590034113156778" />
        {/* Adsense Meta */}
        <meta name="google-adsense-account" content="ca-pub-8590034113156778"></meta>
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MH54GBCJ');`,
        }} />
        {/* Google Tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LJ2F2XWVPN" />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LJ2F2XWVPN');
            `,
          }}
        />
        {/* Canonical Tag */}
        <link rel="canonical" href={metadata.siteUrl} />
        {/* Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="Footloosemonkey, talent competition, kids talent, singing competition, dancing competition" />
        <meta name="author" content="A&W Technologies" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph Tags for Social Sharing */}
        <meta property="og:title" content="Footloosemonkey - Where Young Talents Shine" />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/img/og-image.png" />
        <meta property="og:url" content={metadata.siteUrl} />
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Footloosemonkey - Where Young Talents Shine" />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/img/twitter-image.png" />
        <meta name="twitter:url" content={metadata.siteUrl} />
        {/* Favicon and Icons */}
        <link rel="icon" href="Favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="Favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="Favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="Favicon/android-chrome-512x512.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        {/* Page Title */}
        <title>{metadata.title}</title>
      </head>

      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MH54GBCJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/*  Toastify Container */}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Navbar />
        {children}
        <Footer />

        {/* Razorpay Script */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
