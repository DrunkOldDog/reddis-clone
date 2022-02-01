import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { API } from "aws-amplify";

import styled from "@emotion/styled";
import { Button, TextField, Alert, Snackbar } from "@mui/material";
import { createComment } from "../../graphql/mutations";
import { Comment, CreateCommentInput, CreateCommentMutation, Post } from "../../API";

interface IFormInput {
  comment: string;
}

const FormContainer = styled.form`
  width: 100%;
  display: grid;
  place-items: center;
  padding: 20px 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  div {
    margin: 5px 0;
  }
`;

interface CommentFieldProps {
  post: Post;
  onCommentCreate: (comment: Comment) => void;
}

const CommentField: React.FC<CommentFieldProps> = ({ post, onCommentCreate }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IFormInput>();
  const [submitError, setSubmitError] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const createCommentInput: CreateCommentInput = {
      postCommentsId: post.id,
      content: data.comment,
    };

    try {
      const createNewComment = (await API.graphql({
        query: createComment,
        variables: {
          input: createCommentInput,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: CreateCommentMutation };
      onCommentCreate(createNewComment.data.createComment as Comment);
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Content>
        <TextField
          {...register("comment", {
            required: { value: true, message: "Please enter a comment" },
            maxLength: {
              value: 240,
              message: "Please enter a comment with less than 240 characters.",
            },
          })}
          fullWidth
          multiline
          label="Comment"
          error={!!errors.comment}
          helperText={errors.comment?.message}
        />

        <Button type="submit" variant="contained" style={{ minWidth: 150, marginLeft: 10 }}>
          Add Comment
        </Button>
      </Content>

      <Snackbar open={!!submitError} onClose={() => setSubmitError("")}>
        <Alert variant="filled" severity="error">
          {submitError}
        </Alert>
      </Snackbar>
    </FormContainer>
  );
};

export default CommentField;
