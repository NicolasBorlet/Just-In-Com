import Link from "next/link";

export enum ButtonWidth {
    FULL = "full",
    FIT = "fit",
    AUTO = "auto",
}

export enum ButtonAlignment {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right",
}

const baseClasses =
  "inline-flex items-center justify-center px-7 py-3 rounded-2xl border-2 border-[#A33E5E] bg-[#A33E5E] text-white font-sans text-sm md:text-base tracking-wide transition-colors duration-300 hover:bg-white hover:text-[#A33E5E]";

export default function Button({
  children,
  href,
  isExternal,
  width,
  ariaLabel = ButtonWidth.AUTO,
}: {
  children: React.ReactNode;
  href: string;
  isExternal: boolean;
  width?: ButtonWidth;
  alignment?: ButtonAlignment;
  ariaLabel: string;
}) {
  const widthClass =
    width === ButtonWidth.FULL ? "w-full" : width === ButtonWidth.FIT ? "w-fit" : "w-auto";

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : "_self"}
      className={`${baseClasses} ${widthClass}`}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
