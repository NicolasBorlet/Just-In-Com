import { getAccueil } from "@/data/loaders";
import HomePage from "@/pages/HomePage";

async function loader() {
  const data = await getAccueil();
  return { data };
}

export default async function Page() {
  const { data } = await loader();
  return <HomePage data={data} />;
}
