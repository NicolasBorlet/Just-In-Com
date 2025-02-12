'use client'

import Link from "next/link";

type HomePageProps = {
  data: any; // Vous pouvez typer ceci plus précisément selon la structure de vos données
}

export default function HomePage({ data }: HomePageProps) {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
