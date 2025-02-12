async function loader() {
  const path = "/api/accueil";
  const BASE_URL = "http://localhost:1337";

  const response = await fetch(`${BASE_URL}${path}`);
  const data = await response.json();

  return { ...data };
}

export default async function Home() {
  const { data } = await loader();

  console.log(data);
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}
