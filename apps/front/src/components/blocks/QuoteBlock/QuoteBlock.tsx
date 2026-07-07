import { QuoteBlock as QuoteBlockType } from "./QuoteBlock.type";

export default function QuoteBlock({ block }: { block: QuoteBlockType }) {
  const lines = block.content.split("\n").filter((line) => line.trim() !== "");

  return (
    <figure className="quote-block relative flex flex-col items-center justify-center gap-6 py-12 md:py-20 px-4">
      <span
        aria-hidden="true"
        className="font-special text-[#A33E5E] text-7xl md:text-9xl leading-none select-none"
      >
        &ldquo;
      </span>
      <blockquote className="max-w-4xl text-center font-special italic text-[#772D44] text-3xl md:text-5xl lg:text-6xl leading-snug md:leading-tight">
        {lines.map((line, i) => (
          <p key={i} className={i > 0 ? "mt-2" : ""}>
            {line}
          </p>
        ))}
      </blockquote>
    </figure>
  );
}
