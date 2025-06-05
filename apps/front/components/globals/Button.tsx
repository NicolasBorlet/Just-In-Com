import Link from "next/link";

export enum ButtonWidth {
    FULL = "full",
    FIT = "fit",
    AUTO = "auto",
}

export default function Button({ children, href, isExternal, width = ButtonWidth.AUTO }: { children: React.ReactNode, href: string, isExternal: boolean, width?: ButtonWidth }) {
  return <Link href={href} target={isExternal ? "_blank" : "_self"} className={`bg-primary text-white px-4 py-2 rounded-2xl hover:text-primary hover:bg-secondary transition-all duration-300 ${width === ButtonWidth.FULL ? "w-full" : width === ButtonWidth.FIT ? "w-fit" : "w-auto"}`}>{children}</Link>;
}
