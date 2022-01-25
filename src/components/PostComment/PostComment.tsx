import styled from "@emotion/styled";
import { Grid, Paper, Typography } from "@mui/material";
import { timeSince } from "../../common/helpers";
import type { Comment } from "../../API";

interface PostCommentProps {
  comment: Comment;
}

const PostComment: React.FC<PostCommentProps> = ({ comment }) => {
  return (
    <PostCommentContainer elevation={1}>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="body1">
            <b>{comment.owner}</b> - {timeSince(new Date(comment.createdAt))} ago
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{comment.content}</Typography>
        </Grid>
      </Grid>
    </PostCommentContainer>
  );
};

const PostCommentContainer = styled(Paper)`
  width: 100%;
  min-height: 128px;
  padding: 16px;
  margin-top: 10px;
`;

export default PostComment;
