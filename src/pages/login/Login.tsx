import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { Auth } from "aws-amplify";

import styled from "@emotion/styled";
import { Button, TextField, Alert, Snackbar } from "@mui/material";

interface IFormInput {
  username: string;
  password: string;
}

const FormContainer = styled.form`
  width: 100%;
  display: grid;
  place-items: center;
  padding: 100px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;

  div {
    margin: 5px 0;
  }
`;

const Login: React.FC = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IFormInput>();
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { username, password } = data;
    const amplifyUser = await Auth.signIn(username, password);
    console.log("Success, signed in user:", amplifyUser);
    if (amplifyUser) router.push("/");
    else throw Error("Something went wrong, please try again later.");
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Content>
        <TextField
          {...register("username", {
            required: { value: true, message: "Please enter a username" },
            minLength: {
              value: 3,
              message: "Please enter a username between 3-16 characters.",
            },
            maxLength: {
              value: 16,
              message: "Please enter a username between 3-16 characters.",
            },
          })}
          label="Username"
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          {...register("password", {
            required: { value: true, message: "Please enter a password" },
            minLength: {
              value: 8,
              message: "Please enter a stronger password...",
            },
          })}
          type="password"
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          Sign In
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

export default Login;
