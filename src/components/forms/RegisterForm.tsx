import { Button, Input, useForm, useToaster } from "@mhshifat/mhs-ui";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useFetch from "use-http";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants/index";
import { Wrapper } from "../../styles/authForm";
import { registerValidationSchema } from "../../validations";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const RegisterForm = () => {
  const history = useHistory();
  const { toaster } = useToaster();
  const { post, loading } = useFetch(API_BASE_URL);
  const { formValues, handleChange, handleSubmit, errors, setErrors } = useForm<
    typeof INITIAL_VALUES
  >(INITIAL_VALUES, {
    validationSchema: registerValidationSchema,
  });

  const onSubmit = (stateValues: typeof INITIAL_VALUES) => {
    post(API_ENDPOINTS.AUTH.REGISTER, stateValues).then((res) => {
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
        toaster.success("Your account has been created");
        history.push("/login");
      }
    });
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        label="First Name"
        name="firstName"
        required
        value={formValues.firstName}
        onChange={handleChange}
        error={errors.firstName}
        disabled={loading}
      />
      <Input
        type="text"
        label="Last Name"
        name="lastName"
        required
        value={formValues.lastName}
        onChange={handleChange}
        error={errors.lastName}
        disabled={loading}
      />
      <Input
        type="email"
        label="Email"
        name="email"
        required
        value={formValues.email}
        onChange={handleChange}
        error={errors.email}
        disabled={loading}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        required
        value={formValues.password}
        onChange={handleChange}
        error={errors.password}
        disabled={loading}
      />

      <Button disabled={loading} loading={loading}>
        Sign Up
      </Button>

      <p>
        <Link to="/login">Already have an account? Sign in.</Link>
      </p>
    </Wrapper>
  );
};

export default RegisterForm;
