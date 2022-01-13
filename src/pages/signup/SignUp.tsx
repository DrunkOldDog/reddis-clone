import { useState } from "react";
import { useAuth } from "../../context/auth";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";

import styled from "@emotion/styled";
import { Button, TextField, Alert, Snackbar } from "@mui/material";

interface IFormInput {
  email: string;
  username: string;
  password: string;
  code: string;
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

const SignUp: React.FC = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IFormInput>();
  const { user } = useAuth();
  const router = useRouter();
  const [showCode, setShowCode] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (showCode) {
        await confirmSignUp(data);
      } else {
        await signUpWithEmailAndPassword(data);
        setShowCode(true);
      }
    } catch (err) {
      console.error(err);
      setSubmitError(err.message);
    }
  };

  const signUpWithEmailAndPassword: SubmitHandler<IFormInput> = async (
    data
  ): Promise<CognitoUser | Error> => {
    try {
      const { username, email, password } = data;
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });

      console.log("Signed up user", user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const confirmSignUp: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { username, code, password } = data;
      await Auth.confirmSignUp(username, code);
      const amplifyUser = await Auth.signIn(username, password);
      console.log("Success, signed in user:", amplifyUser);
      if (amplifyUser) router.push("/");
      else throw Error("Something went wrong, please try again later.");
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  console.log("Context user value", user);

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
          {...register("email", {
            required: { value: true, message: "Please enter an email" },
          })}
          type="email"
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
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

        {showCode && (
          <TextField
            {...register("code", {
              required: { value: true, message: "Please enter a code" },
              minLength: {
                value: 6,
                message: "Your verification code must be 6 characters long.",
              },
              maxLength: {
                value: 6,
                message: "Your verification code must be 6 characters long.",
              },
            })}
            label="Verification Code"
            error={!!errors.code}
            helperText={errors.code?.message}
          />
        )}

        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          {showCode ? "Confirm Code" : "Sign Up"}
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

export default SignUp;
