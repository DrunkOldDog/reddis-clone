import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";
import { Button, Container, Grid, TextField } from "@mui/material";

interface IFormInput {
  title: string;
  content: string;
  image?: string;
}

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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="md">
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
            <Button variant="contained" type="submit" style={{ width: "100%" }}>
              Create Post
            </Button>
          </Grid>
        </Grid>
      </FormContainer>
    </Container>
  );
};

export default CreatePost;
