'use client'

import Link from "next/link";

interface HomePageProps {
  data: {
    data: {
      id: number;
    }[];
  };
}

export default function HomePage({ data }: HomePageProps) {
  console.log(data);
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
