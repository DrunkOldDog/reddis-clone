import { useState } from "react";
import { withSSRContext } from "aws-amplify";
import { Container } from "@mui/material";
import PostPreview from "../../components/PostPreview";
import PostComment from "../../components/PostComment";
import CommentField from "../../components/CommentField";

import { listPosts, getPost } from "../../graphql/queries";
import type { Comment, GetPostQuery, ListPostsQuery, Post } from "../../API";
import type { GetStaticProps, GetStaticPaths } from "next";

interface IndividualPostProps {
  post: Post;
}

const IndividualPost: React.FC<IndividualPostProps> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>(post.comments.items);

  const onCommentCreate = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  return (
    <Container maxWidth="md">
      <PostPreview post={post} />

      {/* Add a comment */}
      <CommentField post={post} onCommentCreate={onCommentCreate} />

      {comments
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((comment) => (
          <PostComment key={comment.id} comment={comment} />
        ))}
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext();
  const postsQuery = (await SSR.API.graphql({
    query: getPost,
    variables: {
      id: params.id,
    },
  })) as {
    data: GetPostQuery;
    errors: any[];
  };

  return {
    props: {
      post: postsQuery.data.getPost,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext();
  const response = (await SSR.API.graphql({ query: listPosts })) as {
    data: ListPostsQuery;
    errors: any[];
  };

  const paths = response.data.listPosts.items.map((post) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: "blocking" };
};

export default IndividualPost;
