import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-special text-primary mb-4">404</h1>
      <p className="text-2xl text-quaternary mb-8">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="bg-primary text-white px-6 py-3 rounded-2xl hover:bg-primary/80 transition-all duration-300"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
