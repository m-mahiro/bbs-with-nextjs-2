import { PrismaClient } from "@prisma/client/extension";
import BBSCardList from "./components/BBSCardList";
import { BBSData } from "./types/types";


export async function getBBSAllData()   {

  const response = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });

  const bbsAllData : BBSData[] = await response.json();
  console.log(bbsAllData);

  return bbsAllData;
}


export default async function Home() {
  const bbsAllData = await getBBSAllData();

  return (
    <main>
      <BBSCardList bbsAllData = {bbsAllData} />
    </main>
  );
}
