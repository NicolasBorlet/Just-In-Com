import Link from "next/link";
import type { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-special text-primary mb-4">
        {statusCode || "Erreur"}
      </h1>
      <p className="text-2xl text-quaternary mb-8">
        {statusCode
          ? `Une erreur ${statusCode} est survenue sur le serveur.`
          : "Une erreur est survenue."}
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

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
