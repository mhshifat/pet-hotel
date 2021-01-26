import { Button, Input, useForm, useToaster } from "@mhshifat/mhs-ui";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useFetch from "use-http";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants";
import { setAccessToken } from "../../helpers/localStorage";
import { useAuth } from "../../hooks";
import { Wrapper } from "../../styles/authForm";
import { loginValidationSchema } from "../../validations";

const INITIAL_VALUES = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const history = useHistory();
  const { toaster } = useToaster();
  const { setAuthState } = useAuth();
  const { post, loading } = useFetch(API_BASE_URL);
  const {
    formValues,
    handleChange,
    handleSubmit,
    errors,
    reset,
    setErrors,
  } = useForm<typeof INITIAL_VALUES>(INITIAL_VALUES, {
    validationSchema: loginValidationSchema,
  });

  const setManagerCredential = () => {
    reset({
      email: "user1@gmail.com",
      password: "user1",
    });
  };

  const setEmployeeCredential = () => {
    reset({
      email: "user2@gmail.com",
      password: "user2",
    });
  };

  const setPetOwnerCredential = () => {
    reset({
      email: "user3@gmail.com",
      password: "user3",
    });
  };

  const onSubmit = (stateValues: typeof INITIAL_VALUES) => {
    post(API_ENDPOINTS.AUTH.LOGIN, stateValues).then((res) => {
      if (!res.success && !res.error.messages) toaster.error(res.error.message);
      if (!res.success && res.error.messages?.length) {
        setErrors(
          res.error.messages.reduce((acc: any, curr: any) => {
            acc[curr.path] = curr.message;
            return acc;
          }, {})
        );
      }
      if (res.success) {
        setAuthState(res.data.user);
        setAccessToken(res.data.token);
        toaster.success("You have been logged in successfully");
        history.push("/");
      }
    });
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        label="Email"
        name="email"
        required
        value={formValues.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        required
        value={formValues.password}
        onChange={handleChange}
        error={errors.password}
      />

      <h6>
        Sign in as: <span onClick={setManagerCredential}>Manager</span>{" "}
        <span onClick={setEmployeeCredential}>Employee</span>{" "}
        <span onClick={setPetOwnerCredential}>Pet Owner</span>
      </h6>

      <Button disabled={loading} loading={loading}>
        Sign In
      </Button>

      <p>
        <strong>
          This is a demo application. Do not send/upload sensitive information!
        </strong>{" "}
        All information submitted is public! The database is cleaned daily.
      </p>

      <p>
        <Link to="/register">Create an account!</Link>
      </p>
    </Wrapper>
  );
};

export default LoginForm;
