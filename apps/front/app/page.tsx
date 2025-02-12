import { getAccueil } from "@/data/loaders";
import HomePage from "@/components/HomePage";

async function loader() {
  const data = await getAccueil();
  return { data };
}

export default async function Page() {
  const { data } = await loader();
  return <HomePage data={data} />;
}
