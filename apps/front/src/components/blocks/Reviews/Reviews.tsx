interface Review {
  name: string;
  event: string;
  text: string;
}

const reviewsByLang: Record<string, { heading: string; subtitle: string; reviews: Review[] }> = {
  fr: {
    heading: "Ils nous ont fait confiance",
    subtitle: "Ce que nos clients disent de nous",
    reviews: [
      {
        name: "Camille & Julien",
        event: "Mariage à Bordeaux",
        text: "Un film qui nous fait revivre notre journée à chaque visionnage. Justin a su capter l'émotion de chaque instant avec une délicatesse incroyable.",
      },
      {
        name: "Sophie L.",
        event: "Événement d'entreprise",
        text: "Professionnalisme, réactivité et créativité. La vidéo de notre séminaire a dépassé toutes nos attentes. Merci pour ce travail remarquable !",
      },
      {
        name: "Marie & Thomas",
        event: "Mariage en Dordogne",
        text: "Des images d'une beauté rare, un montage plein de poésie. Nous recommandons Just'in Com les yeux fermés à tous les futurs mariés.",
      },
    ],
  },
  en: {
    heading: "They trusted us",
    subtitle: "What our clients say about us",
    reviews: [
      {
        name: "Camille & Julien",
        event: "Wedding in Bordeaux",
        text: "A film that lets us relive our day with every viewing. Justin captured the emotion of every moment with incredible delicacy.",
      },
      {
        name: "Sophie L.",
        event: "Corporate event",
        text: "Professionalism, responsiveness and creativity. The video of our seminar exceeded all our expectations. Thank you for this remarkable work!",
      },
      {
        name: "Marie & Thomas",
        event: "Wedding in Dordogne",
        text: "Images of rare beauty and an edit full of poetry. We wholeheartedly recommend Just'in Com to all future couples.",
      },
    ],
  },
  de: {
    heading: "Sie haben uns vertraut",
    subtitle: "Was unsere Kunden über uns sagen",
    reviews: [
      {
        name: "Camille & Julien",
        event: "Hochzeit in Bordeaux",
        text: "Ein Film, der uns bei jedem Ansehen unseren Tag noch einmal erleben lässt. Justin hat die Emotion jedes Moments mit unglaublichem Feingefühl eingefangen.",
      },
      {
        name: "Sophie L.",
        event: "Firmenevent",
        text: "Professionalität, Reaktionsfreude und Kreativität. Das Video unseres Seminars hat alle Erwartungen übertroffen. Vielen Dank für diese bemerkenswerte Arbeit!",
      },
      {
        name: "Marie & Thomas",
        event: "Hochzeit in der Dordogne",
        text: "Bilder von seltener Schönheit und ein Schnitt voller Poesie. Wir empfehlen Just'in Com allen zukünftigen Paaren von ganzem Herzen.",
      },
    ],
  },
};

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 étoiles sur 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#A33E5E" aria-hidden="true">
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews({ lang }: { lang: string }) {
  const t = reviewsByLang[lang] ?? reviewsByLang.fr;

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-b from-[#FEC7C8] to-[#FBB8BB] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-12 md:px-24 flex flex-col gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="uppercase tracking-[0.2em] text-sm font-semibold text-[#772D44]/70">{t.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-special text-[#772D44]">{t.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.reviews.map((review, i) => (
            <figure key={i} className="flex flex-col gap-5 bg-white rounded-3xl p-8 shadow-lg">
              <Stars />
              <blockquote className="text-[#431927] text-lg leading-relaxed grow">&ldquo;{review.text}&rdquo;</blockquote>
              <figcaption className="flex flex-col">
                <span className="font-semibold text-[#772D44]">{review.name}</span>
                <span className="text-sm text-gray-500">{review.event}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
