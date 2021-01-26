import {
  Button,
  Input,
  Select,
  Uploader,
  useForm,
  useToaster,
} from "@mhshifat/mhs-ui";
import React from "react";
import { AiFillSave } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import useFetch from "use-http";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants";
import { Wrapper } from "../../styles/newForm";
import { createUserValidationObject } from "../../validations";

const INITIAL_VALUES = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  avatar: "",
  role: "",
};
const NewUserForm = () => {
  const history = useHistory();
  const { toaster } = useToaster();
  const { post, loading } = useFetch(API_BASE_URL);
  const { formValues, handleChange, handleSubmit, errors, setValue } = useForm<
    typeof INITIAL_VALUES
  >(INITIAL_VALUES, {
    validationSchema: createUserValidationObject,
  });

  const onSubmit = (stateValues: typeof INITIAL_VALUES) => {
    post(API_ENDPOINTS.USERS.CREATE_USER, stateValues).then((res) => {
      if (!res.success && !res.error.messages) toaster.error(res.error.message);
      if (res.success) {
        toaster.success("New user has been created");
        history.push("/users");
      }
    });
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        label="First Name"
        name="firstName"
        value={formValues.firstName}
        onChange={handleChange}
        error={errors.firstName}
        required
      />
      <Input
        type="text"
        label="Last Name"
        name="lastName"
        value={formValues.lastName}
        onChange={handleChange}
        error={errors.lastName}
        required
      />
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
      <Input
        type="text"
        label="Phone Number"
        name="phoneNumber"
        value={formValues.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
      />
      <Uploader />
      <Select
        label="Choose a role"
        required
        error={errors.role}
        options={[
          {
            label: "Manager",
            value: "manager",
          },
          {
            label: "Employee",
            value: "employee",
          },
          {
            label: "Pet Owner",
            value: "pet_owner",
          },
        ]}
        onSelect={(selectedValue) => {
          setValue("role", selectedValue.value);
          errors.role &&
            errors.role === "Role is not allowed to be empty" &&
            delete errors.role;
        }}
      />

      <Button disabled={loading} loading={loading} size="small">
        <AiFillSave /> Save
      </Button>
    </Wrapper>
  );
};

export default NewUserForm;
