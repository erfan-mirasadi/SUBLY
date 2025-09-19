import "./globals.css";
import ClientProviders from "../components/ClientProviders";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/Footer";
import NavItem from "../components/navBar/NavItem";
import DropdownNavigator from "../components/navBar/DropdownNavigator";
import { navigation } from "../lib/staticData";
import { Toaster } from "sonner";
import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://sably.ir"),
  title: "سابلی",
  applicationName: "سابلی",
  description: "پلتفرم مدیریت اشتراک‌های دیجیتال",
  keywords: [
    "اشتراک دیجیتال",
    "سابلی",
    "خرید اشتراک",
    "Apple Music",
    "Spotify",
    "YouTube",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/hero/logo1.png",
    shortcut: "/hero/logo1.png",
    apple: "/hero/logo1.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "سابلی",
  },
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: "سابلی",
    description: "پلتفرم مدیریت اشتراک‌های دیجیتال",
    images: [
      { url: "/hero/logo1.png", width: 1024, height: 1024, alt: "سابلی" },
    ],
    locale: "fa_IR",
    siteName: "سابلی",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "سابلی",
    description: "پلتفرم مدیریت اشتراک‌های دیجیتال",
    images: ["/hero/logo1.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="fa">
      <body
        className={`${vazirmatn.className} flex justify-start flex-col min-h-screen`}
        cz-shortcut-listen="true"
        suppressHydrationWarning
      >
        <ClientProviders>
          <NavBar>
            {navigation.map((item) =>
              item.isDropDown ? (
                <DropdownNavigator key={item.id} item={item}>
                  {item.title}
                </DropdownNavigator>
              ) : (
                <NavItem key={item.id} item={item}>
                  {item.title}
                </NavItem>
              )
            )}
          </NavBar>
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
