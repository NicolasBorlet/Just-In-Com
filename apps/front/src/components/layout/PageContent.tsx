import Footer from "./Footer";
import Header from "./Header";
import { StrapiGlobal } from "@/types";

export default function PageContent({ children, global, lang, availableLocales }: { children: React.ReactNode; global?: StrapiGlobal; lang?: string; availableLocales: string[] }) {
  return (
    <>
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-12 md:px-24 lg:px-24 xl:px-[120px] gap-24 flex flex-col">
        <Header global={global} lang={lang} availableLocales={availableLocales} />
        {children}
      </div>

      <Footer global={global} lang={lang} availableLocales={availableLocales} />
    </>
  );
}
