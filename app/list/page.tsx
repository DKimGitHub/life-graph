import Link from "next/link";
import LifeChart from "../../components/listPage/ListPageGraph";
import ListPageCard from "../../components/listPage/ListPageCard";
import PageModal from "../../components/PostPage";
import ListPageSorter from "../../components/listPage/ListPageSorter";
import prisma from "../../lib/prisma";
import { dataType } from "../../lib/types";
import ListPageContent from "../../components/listPage/ListPageContent";

async function fetchData() {
  const listOfPosts = await prisma.post.findMany({
    take: 6,
    // where: {
    //   published:true,
    // },
    select: {
      id: true,
      user: true,
      usersWhoHearted: true,
      numOfHearts: true,
      comments: true,
      updatedAt: true,
      createdAt: true,
      graph: {
        include: {
          nodes: {
            select: {
              xValue: true,
              yValue: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  // const filtered = feed.filter(
  //   (e) => e.graph?.nodes && e.graph?.nodes.length > 0
  // );
  // return filtered;
  return {listOfPosts};
}
export default async function Page() {
  const { listOfPosts } = await fetchData();
  const colorTheme = "cupcake";
  return (
    <>
      <ListPageContent listOfPosts={JSON.stringify(listOfPosts)}/>
    </>
  );
}
