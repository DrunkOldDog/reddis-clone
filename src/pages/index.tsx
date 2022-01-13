import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

import { API } from "aws-amplify";
import { listPosts } from "../graphql/queries";
import type { ListPostsQuery, Post } from "../API";

type ListPostsData = {
  data: ListPostsQuery;
};

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const allPosts = (await API.graphql({ query: listPosts })) as ListPostsData;
      if (allPosts.data.listPosts) setPosts(allPosts.data.listPosts.items as Post[]);
    })();
  }, []);

  return (
    <>
      {user ? (
        <Typography variant="h4">Hello {user.getUsername()}!</Typography>
      ) : (
        <Link href={"/signup"}>
          <Button>Sign Up here! </Button>
        </Link>
      )}

      <Typography variant="h5">Posts List:</Typography>
      {posts.map(({ title, createdAt }) => (
        <li key={`${title}-${createdAt}`}>{title}</li>
      ))}
    </>
  );
}
