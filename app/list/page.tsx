import Link from "next/link";
import prisma from "../../lib/prisma";
import styles from './page.module.css'
import Graph from '../../components/Graph';

export const dynamic = 'force-dynamic'

async function fetchData() {
  const feed = await prisma.post.findMany();
  return feed;
}

export default async function Page() {
  const postList = await fetchData();
  return (
    <div className="my-5 grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
    {postList.map((data, index) => (
      <div key={index} className={` relative h-56 w-full bg-base-200`}><Graph/></div>
    ))}
    </div>
  );  
}
