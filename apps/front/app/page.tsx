import { getAccueil } from "@/data/loaders";

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
      {/* <h1>{data.title}</h1>
      <p>{data.description}</p> */}
    </div>
  );
}
