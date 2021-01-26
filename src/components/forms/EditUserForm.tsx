import {
  Button,
  Input,
  Select,
  Uploader,
  useForm,
  useToaster,
} from "@mhshifat/mhs-ui";
import React, { useEffect } from "react";
import { AiFillSave } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import useFetch from "use-http";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants/index";
import { Wrapper } from "../../styles/newForm";
import { updateUserValidationObject } from "../../validations";

const INITIAL_VALUES = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  avatar: "",
  role: "",
};
const EditUserForm: React.FC<{ id: string }> = ({ id }) => {
  const history = useHistory();
  const { toaster } = useToaster();
  const { put, loading } = useFetch(API_BASE_URL);
  const { data, loading: dataLoading, cache } = useFetch(
    API_BASE_URL + API_ENDPOINTS.USERS.GET_USER + id,
    {},
    []
  );
  const { formValues, handleChange, handleSubmit, errors, reset } = useForm<
    typeof INITIAL_VALUES
  >(INITIAL_VALUES, {
    validationSchema: updateUserValidationObject,
  });

  useEffect(() => {
    cache.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && !dataLoading) {
      reset({
        id: data.data.user._id,
        email: data.data.user.email,
        firstName: data.data.user.firstName,
        lastName: data.data.user.lastName,
        phoneNumber: data.data.user.phoneNumber,
        avatar: data.data.user.avatar,
        role: data.data.user.role,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataLoading]);

  const onSubmit = (stateValues: typeof INITIAL_VALUES) => {
    put(API_ENDPOINTS.USERS.UPDATE_USER + id, stateValues).then((res) => {
      if (!res.success && !res.error.messages) toaster.error(res.error.message);
      if (res.success) {
        toaster.success("User has been updated successfully");
        history.push("/users/" + id);
      }
    });
  };

  return dataLoading ? (
    <p>Loading...</p>
  ) : (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        label="ID"
        name="id"
        value={formValues.id}
        onChange={handleChange}
        error={errors.id}
        disabled={true}
      />
      <Input
        type="email"
        label="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        error={errors.email}
        disabled={true}
      />
      <Input
        type="text"
        label="First Name"
        name="firstName"
        value={formValues.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <Input
        type="text"
        label="Last Name"
        name="lastName"
        value={formValues.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      <Input
        type="text"
        label="Phone Number"
        name="phoneNumber"
        value={formValues.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
      />
      <Uploader defaultFiles={[formValues.avatar]} />
      <Select
        defaultValue={formValues.role}
        label="Choose a role"
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
      />

      <Button disabled={loading} loading={loading} size="small">
        <AiFillSave /> Update
      </Button>
    </Wrapper>
  );
};

export default EditUserForm;
