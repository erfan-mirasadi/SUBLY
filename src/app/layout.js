import "./globals.css";
import ClientProviders from "../components/ClientProviders";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/Footer";
import NavItem from "../components/navBar/NavItem";
import DropdownNavigator from "../components/navBar/DropdownNavigator";
import { navigation } from "../lib/staticData";
import { Toaster } from "sonner"

export const metadata = {
  title: "SUBLY",
  description: "Digital subscription",
};

export default function RootLayout({ children }) {

  return (
    <html dir="ltr" lang="fa">
      <body className="flex justify-start flex-col min-h-screen">
        <ClientProviders>
          <NavBar>
            {navigation.map((item) => item.isDropDown ? <DropdownNavigator key={item.id} item={item}>{item.title}</DropdownNavigator> : <NavItem key={item.id} item={item}>{item.title}</NavItem> )}
          </NavBar>
          <main className="flex-1">{children}</main>
          <Footer/>
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
