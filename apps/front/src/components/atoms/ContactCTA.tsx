import Button, { ButtonWidth } from "@/components/atoms/Button";
import { getLocalizedPath } from "@/lib/i18n";

const labels: Record<string, string> = {
  fr: "Me contacter",
  en: "Contact me",
  de: "Kontaktieren",
};

export default function ContactCTA({
  lang = "fr",
  className = "",
}: {
  lang?: string;
  className?: string;
}) {
  return (
    <div className={`flex justify-center py-8 ${className}`}>
      <Button
        href={getLocalizedPath("contact", lang)}
        isExternal={false}
        width={ButtonWidth.FIT}
        ariaLabel={labels[lang] || labels.fr}
      >
        {labels[lang] || labels.fr}
      </Button>
    </div>
  );
}
