import "./globals.css";
import {
  Roboto,
  Sora,
  Source_Code_Pro,
  Space_Grotesk,
  Inter,
  Poppins,
  Vazirmatn,
} from "next/font/google";
import ClientProviders from "@/src/components/ClientProviders";
import ClientLayoutChrome from "@/src/components/ClientLayoutChrome";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
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
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-vazirmatn",
});

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
        <ClientProviders>
          <ClientLayoutChrome>
            <main className="flex-1">{children}</main>
          </ClientLayoutChrome>
        </ClientProviders>
      </body>
    </html>
  );
}
