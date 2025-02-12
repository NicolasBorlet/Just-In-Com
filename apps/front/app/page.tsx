import { getAccueil } from "@/data/loaders";
import Link from "next/link";

async function loader() {
  const data = await getAccueil();

  console.log(data);
  return { data };
}

export default async function Home() {
  const { data } = await loader();

  console.log(data);
  return (
    <div>
      <Link href="/about">About</Link>
    </div>
  );
}
