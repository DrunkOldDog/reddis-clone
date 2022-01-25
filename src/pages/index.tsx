import { useEffect, useState } from "react";
import { Container } from "@mui/material";

import { API } from "aws-amplify";
import { listPosts } from "../graphql/queries";
import type { ListPostsQuery, Post } from "../API";
import PostPreview from "../components/PostPreview";

type ListPostsData = {
  data: ListPostsQuery;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const allPosts = (await API.graphql({ query: listPosts })) as ListPostsData;
      if (allPosts.data.listPosts) setPosts(allPosts.data.listPosts.items as Post[]);
    })();
  }, []);

  return (
    <Container>
      {posts.map((post) => (
        <PostPreview key={`${post.title}-${post.createdAt}`} post={post} />
      ))}
    </Container>
  );
}
