import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import { Box, ButtonBase, Grid, IconButton, Paper, Typography } from "@mui/material";
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import { timeSince } from "../../common/helpers";
import type { Post } from "../../API";

interface PostPreviewProps {
  post: Post;
}

const StyledPostPreview = styled(Grid)`
  padding: 12px;
  margin-top: 24px;
`;

const VoteButton = styled(IconButton)``;
VoteButton.defaultProps = {
  color: "inherit",
};

const VotesBox = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PostPreview: React.FC<PostPreviewProps> = ({ post }: PostPreviewProps) => {
  const router = useRouter();

  return (
    <Paper elevation={3}>
      <StyledPostPreview direction="row" spacing={3} container>
        <Grid item sm={1} xs={2}>
          <Grid container direction={"column"} alignItems={"center"} spacing={1}>
            <Grid item>
              <VoteButton>
                <ArrowUpwardIcon />
              </VoteButton>
            </Grid>
            <Grid item>
              <VotesBox>
                <Typography variant="h6">{post.upvotes - post.downvotes}</Typography>
                <Typography variant="body2">votes</Typography>
              </VotesBox>
            </Grid>
            <Grid item>
              <VoteButton>
                <ArrowDownwardIcon />
              </VoteButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={11} xs={10}>
          <ButtonBase onClick={() => router.push(`/post/${post.id}`)} style={{ width: "100%" }}>
            <Grid container direction="column" alignItems={"flex-start"}>
              <Typography variant="body1">
                Posted by <b>{post.owner}</b> {timeSince(new Date(post.createdAt))} ago
              </Typography>
              <Typography variant={"h2"}>{post.title}</Typography>
              <Typography
                variant="body1"
                style={{
                  maxHeight: 64,
                  overflowY: "hidden",
                  textAlign: "start",
                }}
              >
                {post.contents}
              </Typography>

              <Grid item>
                {post.image && (
                  <Image src={post.image} height={270} width={420} layout="intrinsic" />
                )}
              </Grid>
            </Grid>
          </ButtonBase>
        </Grid>
      </StyledPostPreview>
    </Paper>
  );
};

export default PostPreview;
