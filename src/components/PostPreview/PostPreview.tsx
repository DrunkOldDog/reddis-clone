import styled from "@emotion/styled";
import { Grid, IconButton } from "@mui/material";
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import type { Post } from "../../API";

interface PostPreviewProps {
  post: Post;
}

const StyledPostPreview = styled(Grid)`
  border: 1px solid #fff;
`;

const VoteButton = styled(IconButton)`
  svg {
    max-width: 16px;
  }
`;
VoteButton.defaultProps = {
  color: "inherit",
};

const PostPreview: React.FC<PostPreviewProps> = ({ post }: PostPreviewProps) => {
  return (
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

      <Grid item>rest of the content</Grid>
    </StyledPostPreview>
  );
};

export default PostPreview;
