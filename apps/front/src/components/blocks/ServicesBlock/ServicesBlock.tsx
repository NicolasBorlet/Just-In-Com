import { AnimatedHeading, AnimatedParagraphLine } from "@/animations/AnimatedText";
import RichText from "@/components/atoms/RichText";
import { ServicesBlock as ServicesBlockType } from "./ServicesBlock.type";

/**
 * Compact numbered steps inspired by lecomptoirdubonheur.com —
 * parses H3 headings from the Services richtext into step cards when possible.
 */
function extractSteps(services: string): { title: string; body: string }[] | null {
  const h3Regex = /(?:^|\n)#{1,3}\s+(.+?)(?=\n|$)|<h[23][^>]*>(.*?)<\/h[23]>/gi;
  const matches = [...services.matchAll(h3Regex)];
  if (matches.length < 2) return null;

  const parts = services.split(/(?:^|\n)#{1,3}\s+.+?(?=\n|$)|<h[23][^>]*>.*?<\/h[23]>/gi);
  const steps: { title: string; body: string }[] = [];

  matches.forEach((m, i) => {
    const title = (m[1] || m[2] || "").trim();
    const body = (parts[i + 1] || "").trim();
    if (title) steps.push({ title, body });
  });

  return steps.length >= 2 ? steps : null;
}

export default function ServicesBlock({ block }: { block: ServicesBlockType }) {
  const steps = block.Services ? extractSteps(block.Services) : null;

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {block.description && (
        <AnimatedParagraphLine className="text-base md:text-lg text-center text-[#3B1621]/80">
          {block.description}
        </AnimatedParagraphLine>
      )}

      {block.title && (
        <AnimatedHeading level={2} className="text-3xl md:text-4xl text-center font-special">
          {block.title}
        </AnimatedHeading>
      )}

      {steps ? (
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col gap-3 items-center text-center bg-[#F4E1E7]/70 rounded-xl p-6"
            >
              <span className="text-4xl md:text-5xl font-special text-[#A33E5E]">{index + 1}</span>
              <h3 className="text-lg md:text-xl font-special text-[#3B1621]">{step.title}</h3>
              {step.body && (
                <div
                  className="text-sm text-[#3B1621]/80 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: step.body
                      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\*(.+?)\*/g, "<em>$1</em>")
                      .replace(/\n/g, "<br />"),
                  }}
                />
              )}
            </li>
          ))}
        </ol>
      ) : (
        block.Services && (
          <div className="bg-[#F4E1E7]/70 p-6 md:p-10 rounded-xl">
            <RichText content={block.Services} style="text-sm text-center md:text-left" specialH3={true} />
          </div>
        )
      )}
    </div>
  );
}
