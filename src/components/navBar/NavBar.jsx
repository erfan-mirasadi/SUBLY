import Link from "next/link";
import Image from "next/image";
import CartIcon from "./CartIcon";
import Menu from "./Menu";
import NavbarContainer from "./NavbarContainer";
import AuthButton from "./AuthButton";
import SignoutButton from "./SignoutButton";
import SearchBar from "./SearchBar";

export default function NavBar({ children }) {
  return (
    <NavbarContainer>
      <div className=" flex w-full justify-between items-center px-5 py-5 lg:px-8 xl:px-10 max-w-[1440px] !mx-auto z-20">
        <Menu />
        <Link
          href="/"
          className="flex justify-center font-grotesk font-bold text-2xl scale-210 items-center md:justify-start ml-[2px]"
        >
          <Image
            src="/hero/logo1.png"
            alt="SABLY logo"
            width={600}
            height={600}
            className="h-8 w-12"
            priority
          />
        </Link>
        <div className="items-center gap-4 text-xs font-grotesk hidden md:flex">
          {children}
        </div>
        <div className="flex items-center justify-end md:items-center gap-4 text-xs font-grotesk z-30 relative">
          <CartIcon />
          <div className="bg-conic-gradient hidden p-[1px] md:flex justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300 rounded-lg">
            <AuthButton />
          </div>
          <div className="hidden md:flex">
            <SearchBar />
          </div>
          {/* Only show SignoutButton on desktop (md and up) */}
          <div className="hidden md:block">
            <SignoutButton />
          </div>
        </div>
      </div>
    </NavbarContainer>
  );
}
