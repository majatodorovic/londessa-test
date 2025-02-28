import { CartContextProvider } from "./api/cartContext";
import "./globals.css";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer/Footer";
import NavigationMobile from "@/components/Navigation/NavigationMobile";
import TrackingScripts from "@/components/GTAG/GTAG";
import { UserProvider } from "@/context/userContext";
import CookieAlert from "@/components/CookieAlert/CookieAlert";
import Header from "@/components/Header/Header";
import { get } from "@/app/api/api";
import { QueryProvider } from "@/components/QueryProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          crossOrigin="anonymous"
          src="https://kit.fontawesome.com/f141ac3909.js"
        />{" "}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
        {/*<link rel="icon" href="./icon.png?123" sizes="any"/>*/}
      </head>
      <body className="relative">
        <QueryProvider>
          <UserProvider>
            <CartContextProvider>
              {/*<TrackingScripts />*/}
              <Header />
              <NavigationMobile />
              {children}
              <Footer />
            </CartContextProvider>
          </UserProvider>
        </QueryProvider>
        <CookieAlert />
      </body>
    </html>
  );
}

export const metadata = {
  title: "Početna | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Početna | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};
