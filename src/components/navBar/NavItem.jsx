import Link from "next/link";

export default function NavItem({ item, isActive, onClick }) {
  return (
    <Link
      href={item.url}
      onClick={onClick}
      className={`
        relative
        block font-medium uppercase 
        transition-all duration-300
        px-6 py-8 text-2xl
        text-white/70
        lg:text-xs lg:py-1.5 lg:px-4 xl:px-6
        hover:text-white
        group
      `}
    >
      {item.title}

      {/* buttom line */}
      <span
        className={`
          absolute bottom-0 left-1/2 -translate-x-1/2
          h-[2px] bg-gradient-to-r from-[#DD734F] to-[#B9AEDF] rounded-full
          transition-all duration-500
          ${isActive ? "w-1/2 opacity-40" : "w-0 opacity-0"}
          group-hover:w-1/3 group-hover:opacity-70
        `}
      />

      {/* dot */}
      <span
        className={`
          absolute -left-1 top-1/2 -translate-y-1/2
          w-1.5 h-1.5 rounded-full
          transition-all duration-300
          ${isActive ? "bg-[#DD734F] opacity-100" : "opacity-0"} 
          lg:hidden
        `}
      />
    </Link>
  );
}
