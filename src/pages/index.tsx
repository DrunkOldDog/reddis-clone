import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";

import { API } from "aws-amplify";
import { listPosts } from "../graphql/queries";
import type { ListPostsQuery, Post } from "../API";
import PostPreview from "../components/PostPreview";

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
    <Container>
      {user ? (
        <Typography variant="h4">Hello {user.getUsername()}!</Typography>
      ) : (
        <Link href={"/signup"}>
          <Button>Sign Up here! </Button>
        </Link>
      )}

      {posts.map((post) => (
        <PostPreview key={`${post.title}-${post.createdAt}`} post={post} />
      ))}
    </Container>
  );
}
