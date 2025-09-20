"use client";
import Link from "next/link";
import useActiveLink from "@/src/hooks/useActiveLink";

export default function NavItem({
  item,
  onClick,
  children,
  onMouseEnter,
  onMouseLeave,
  disableLink = false,
}) {
  const activeHash = useActiveLink();
  const isActive = activeHash === item.url;
  const baseClasses = `
        relative
        block
        transition-all duration-300
        px-6 py-1 my-2 md:my-0 text-2xl
        text-white/70
        md:text-xs md:py-1.5 md:px-4 xl:px-6
        hover:text-white
        group
        z-0
        font-vazirmatn
        font-bold
        cursor-pointer
        select-none
      `;

  const Component = disableLink ? "span" : Link;

  return (
    <Component
      {...(!disableLink ? { href: item.url } : {})}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={baseClasses}
    >
      {children}

      <span
        className={`
          absolute bottom-0 left-1/2 -translate-x-1/2
          h-[2px] bg-gradient-to-r from-[#DD734F] to-[#B9AEDF] rounded-full
          transition-all duration-500
          ${isActive ? "w-1/2 opacity-40" : "w-0 opacity-0"}
          group-hover:w-1/3 group-hover:opacity-70
        `}
      />

      <span
        className={`
          absolute -left-1 top-1/2 -translate-y-1/2
          w-1.5 h-1.5 rounded-full
          transition-all duration-300
          ${isActive ? "bg-[#DD734F] opacity-100" : "opacity-0"} 
          lg:hidden
        `}
      />
    </Component>
  );
}
