import Link from "next/link";

export default function NavButton({
  children,
  href,
  secondary = false,
  className = "",
}) {
  return (
    <Link
      href={href}
      className={`
        px-4 py-2 rounded-xl font-medium transition-all duration-300
        ${
          secondary
            ? "text-white/70 hover:text-white"
            : "bg-gradient-to-r from-[#DD734F] to-[#B9AEDF] text-white hover:shadow-lg hover:shadow-[#DD734F]/20"
        }
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
