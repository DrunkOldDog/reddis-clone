import styled from "@emotion/styled";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { Storage, API } from "aws-amplify";

import ImageDropzone from "../../components/ImageDropzone";
import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import { createPost } from "../../graphql/mutations";
import type { CreatePostInput, CreatePostMutation } from "../../API";

interface IFormInput {
  title: string;
  content: string;
  image?: string;
}

type CreateNewPost = {
  data: CreatePostMutation;
};

const FormContainer = styled.form`
  width: 100%;
  display: grid;
  place-items: center;
  padding: 100px;
`;

const CreatePost: React.FC = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IFormInput>();
  const { push } = useRouter();
  const [file, setFile] = useState<File | undefined>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      let imagePath: string | undefined;
      if (file) {
        imagePath = data.title.replaceAll(" ", "-");
        await Storage.put(imagePath, file, {
          contentType: file.type,
        });
      }

      const createPostInput: CreatePostInput = {
        title: data.title,
        image: imagePath,
        contents: data.content,
        upvotes: 0,
        downvotes: 0,
      };

      const createNewPost = (await API.graphql({
        query: createPost,
        variables: {
          input: createPostInput,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as CreateNewPost;

      console.log("new post created successfully", createNewPost);
      push(`/post/${createNewPost.data.createPost.id}`);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper style={{ marginTop: 75 }} elevation={3}>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} direction={"column"}>
            <Grid item>
              <TextField
                {...register("title", {
                  required: { value: true, message: "Please enter a title." },
                  maxLength: {
                    value: 120,
                    message: "Please enter a title that is 120 characters or less",
                  },
                })}
                fullWidth
                label="Post Title"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>

            <Grid item>
              <TextField
                {...register("content", {
                  required: { value: true, message: "Please enter a some content for your post." },
                  maxLength: {
                    value: 1000,
                    message: "Please make sure your content is 1000 characters or less.",
                  },
                })}
                fullWidth
                multiline
                label="Post Content"
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            </Grid>

            <Grid item>
              <ImageDropzone file={file} setFile={setFile} />
            </Grid>

            <Grid item>
              <Button variant="contained" type="submit" style={{ width: "100%" }}>
                Create Post
              </Button>
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
    </Container>
  );
};

export default CreatePost;
