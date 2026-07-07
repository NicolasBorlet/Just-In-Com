import Link from "next/link";
import { getLocalizedPath } from "@/lib/i18n";

const translations: Record<string, { title: string; text: string; button: string }> = {
  fr: {
    title: "Un projet en tête ?",
    text: "Parlons de votre mariage ou de votre événement. Je vous réponds dans les plus brefs délais.",
    button: "Me contacter",
  },
  en: {
    title: "Have a project in mind?",
    text: "Let's talk about your wedding or event. I'll get back to you as soon as possible.",
    button: "Contact me",
  },
};

export default function ContactCta({ lang }: { lang: string }) {
  const t = translations[lang] ?? translations.fr;

  return (
    <section className="flex flex-col items-center gap-6 rounded-3xl bg-[#FEC7C8]/50 px-6 py-14 text-center">
      <h2 className="text-3xl md:text-4xl font-special text-[#772D44]">{t.title}</h2>
      <p className="max-w-xl text-lg text-[#431927]/80">{t.text}</p>
      <Link
        href={getLocalizedPath("contact", lang)}
        className="inline-flex items-center justify-center border-2 border-[#A33E5E] bg-[#A33E5E] px-8 py-3 rounded-full text-white font-sans font-semibold tracking-wide text-lg transition-all duration-300 ease-out hover:bg-white hover:text-[#A33E5E] hover:shadow-lg hover:-translate-y-0.5"
      >
        {t.button}
      </Link>
    </section>
  );
}
