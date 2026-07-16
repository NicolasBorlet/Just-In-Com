const reviews = {
  fr: [
    {
      name: "Camille & Thomas",
      text: "Just’in a capturé toute l’émotion de notre journée. Les images sont magnifiques, naturelles et tellement nous.",
    },
    {
      name: "Sophie M.",
      text: "Un accompagnement pro du début à la fin. Notre film d’entreprise a vraiment fait la différence auprès de nos clients.",
    },
    {
      name: "Léa & Julien",
      text: "Discret, bienveillant et ultra créatif. On revoit notre film en boucle depuis le mariage !",
    },
  ],
  en: [
    {
      name: "Camille & Thomas",
      text: "Just’in captured every emotion of our day. The images are beautiful, natural, and so us.",
    },
    {
      name: "Sophie M.",
      text: "Professional from start to finish. Our corporate film really made a difference with our clients.",
    },
    {
      name: "Léa & Julien",
      text: "Discreet, kind and incredibly creative. We’ve been rewatching our wedding film on loop!",
    },
  ],
};

const titles: Record<string, string> = {
  fr: "Ils en parlent",
  en: "What they say",
};

export default function ReviewsSection({ lang = "fr" }: { lang?: string }) {
  const items = reviews[lang as keyof typeof reviews] || reviews.fr;
  const title = titles[lang] || titles.fr;

  return (
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#F4E1E7] py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-12 md:px-24 flex flex-col gap-12">
        <h2 className="text-4xl md:text-6xl text-center font-special text-[#3B1621]">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {items.map((review) => (
            <blockquote key={review.name} className="flex flex-col gap-4 text-center">
              <p className="text-lg md:text-xl leading-relaxed text-[#3B1621]">“{review.text}”</p>
              <footer className="text-sm uppercase tracking-widest text-[#A33E5E] font-medium">
                — {review.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
