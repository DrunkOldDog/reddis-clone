import { withSSRContext } from "aws-amplify";
import { listPosts, getPost } from "../../graphql/queries";
import type { GetPostQuery, ListPostsQuery, Post } from "../../API";
import type { GetStaticProps, GetStaticPaths } from "next";
import PostPreview from "../../components/PostPreview";
import { Container } from "@mui/material";

interface IndividualPostProps {
  post: Post;
}

const IndividualPost: React.FC<IndividualPostProps> = ({ post }) => {
  console.log("got post", post);
  return (
    <Container maxWidth="md">
      <PostPreview post={post} />
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
