import "./globals.css";
import NavBar from "@/src/components/navBar/NavBar";
import Footer from "../components/Footer";
import {
  Roboto,
  Sora,
  Source_Code_Pro,
  Space_Grotesk,
  Inter,
  Poppins,
  Vazirmatn,
} from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-code",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // 👈 این
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // اینم
});
const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-vazirmatn",
});
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "SUBLY",
  description: "Digital subscription",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      className={`${roboto.variable} ${sora.variable} ${sourceCodePro.variable} ${spaceGrotesk.variable} ${inter.variable} ${poppins.variable} ${vazir.variable}`}
    >
      <body className="flex justify-start flex-col min-h-screen">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
