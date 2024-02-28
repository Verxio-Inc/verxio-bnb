import "./globals.css";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ReduxProvider from "../components/reduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WagmiProviders from "../components/wagmiProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Verxio Protocol",
  description: "Verxio Protocol",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter`}>
        <AppRouterCacheProvider>
        <WagmiProviders>
            <ReduxProvider>{children}</ReduxProvider>
          </WagmiProviders>
        </AppRouterCacheProvider>
        <ToastContainer/>
      </body>
    </html>
  );
}
