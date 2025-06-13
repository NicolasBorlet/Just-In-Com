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

export default function Button({ children, href, isExternal, width = ButtonWidth.AUTO, alignment = ButtonAlignment.CENTER }: { children: React.ReactNode, href: string, isExternal: boolean, width?: ButtonWidth, alignment?: ButtonAlignment }) {
  return <Link href={href} target={isExternal ? "_blank" : "_self"} className={`bg-primary text-white px-5 py-2 rounded-2xl hover:bg-secondary transition-all duration-300 ${width === ButtonWidth.FULL ? "w-full" : width === ButtonWidth.FIT ? "w-fit" : "w-auto"} ${alignment === ButtonAlignment.LEFT ? "self-start" : alignment === ButtonAlignment.CENTER ? "self-center" : "self-end"} font-special`}>{children}</Link>;
}
