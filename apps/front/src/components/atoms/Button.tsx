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

export default function Button({ children, href, isExternal, width, ariaLabel = ButtonWidth.AUTO }: { children: React.ReactNode, href: string, isExternal: boolean, width?: ButtonWidth, alignment?: ButtonAlignment, ariaLabel: string }) {
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : "_self"}
      className={`group inline-flex items-center justify-center gap-2 border-2 border-[#A33E5E] bg-[#A33E5E] text-white px-8 py-3 rounded-full font-sans font-semibold tracking-wide text-sm md:text-lg transition-all duration-300 ease-out hover:bg-white hover:text-[#A33E5E] hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A33E5E] focus-visible:ring-offset-2 ${width === ButtonWidth.FULL ? "w-full" : width === ButtonWidth.FIT ? "w-fit" : "w-auto"}`}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
