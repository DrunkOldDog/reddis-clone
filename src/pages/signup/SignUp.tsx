import styled from "@emotion/styled";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Alert, Snackbar } from "@mui/material";
import { useState } from "react";

interface IFormInput {
  email: string;
  username: string;
  password: string;
  iceCreamType: { label: string; value: string };
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
  const [submitError, setSubmitError] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const {} = data;
      throw Error("Breaking app for alrt");
    } catch (error) {
      console.log(error);
      setSubmitError(error.message);
    }
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

        <TextField
          {...register("email", {
            required: { value: true, message: "Please enter an email" },
          })}
          type="email"
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          Sign Up
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
