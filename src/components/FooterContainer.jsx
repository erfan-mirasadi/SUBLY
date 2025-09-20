"use client"
import { usePathname } from "next/navigation";
function Footer({children}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  return (
    <div className={`max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col pt-22 ${isLoginPage ? "hidden" : ""}`}>
      {children}
    </div>
  );
}

export default Footer;
