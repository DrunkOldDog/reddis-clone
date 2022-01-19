import styled from "@emotion/styled";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
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

const PostPreview: React.FC<PostPreviewProps> = ({ post }: PostPreviewProps) => {
  return (
    <Paper elevation={3}>
      <StyledPostPreview direction="row" spacing={3} container>
        <Grid item spacing={1} direction="column">
          <Grid container direction={"column"} alignItems={"center"}>
            <Grid item>
              <VoteButton>
                <ArrowUpwardIcon />
              </VoteButton>
            </Grid>
            <Grid item>votes</Grid>
            <Grid item>
              <VoteButton>
                <ArrowDownwardIcon />
              </VoteButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column">
            <Typography variant="body1">
              Posted by <b>{post.owner}</b> at <b>{post.createdAt}</b>
            </Typography>
            <Typography variant={"h2"}>{post.title}</Typography>
          </Grid>
        </Grid>
      </StyledPostPreview>
    </Paper>
  );
};

export default PostPreview;
