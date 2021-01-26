import { Button, Input, Select, useForm, useToaster } from "@mhshifat/mhs-ui";
import React from "react";
import { AiFillSave } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import useFetch from "use-http";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants";
import { IUser } from "../../pages/Users";
import { Wrapper } from "../../styles/newForm";
import { createPetValidationObject } from "../../validations";

const INITIAL_VALUES = {
  owner: "",
  name: "",
  type: "",
  bread: "",
  size: "",
};
const NewPetForm = () => {
  const history = useHistory();
  const { toaster } = useToaster();
  const { post, loading } = useFetch(API_BASE_URL);
  const { data: usersData, loading: usersDataLoading } = useFetch(
    API_BASE_URL + API_ENDPOINTS.USERS.GET_USERS,
    // @ts-ignore
    { cachePolicy: "no-cache" },
    []
  );
  const { formValues, handleChange, handleSubmit, errors, setValue } = useForm<
    typeof INITIAL_VALUES
  >(INITIAL_VALUES, {
    validationSchema: createPetValidationObject,
  });

  const onSubmit = (stateValues: typeof INITIAL_VALUES) => {
    post(API_ENDPOINTS.PETS.CREATE_PET, stateValues).then((res) => {
      if (!res.success && !res.error.messages) toaster.error(res.error.message);
      if (res.success) {
        toaster.success("New pet has been created");
        history.push("/pets");
      }
    });
  };

  return usersDataLoading ? null : (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Owner"
        error={errors.owner}
        required
        options={usersData?.data?.users?.map?.((user: IUser) => ({
          label: `${user.firstName} ${user.lastName} <${user.email}>`,
          value: user._id,
        }))}
        onSelect={(selected) => {
          setValue("owner", selected.value);
          delete errors?.owner;
        }}
      />
      <Input
        type="text"
        label="Name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <Select
        label="Type"
        error={errors.type}
        required
        options={[
          {
            label: "Dog",
            value: "dog",
          },
          {
            label: "Cat",
            value: "cat",
          },
        ]}
        onSelect={(selected) => {
          setValue("type", selected.value);
          delete errors?.type;
        }}
      />
      <Input
        type="text"
        label="Bread"
        name="bread"
        value={formValues.bread}
        onChange={handleChange}
        error={errors.bread}
        required
      />
      <Select
        label="Size"
        error={errors.size}
        required
        options={[
          {
            label: "Small",
            value: "small",
          },
          {
            label: "Medium",
            value: "medium",
          },
          {
            label: "Large",
            value: "large",
          },
        ]}
        onSelect={(selected) => {
          setValue("size", selected.value);
          delete errors?.size;
        }}
      />

      <Button loading={loading} disabled={loading} size="small">
        <AiFillSave /> Save
      </Button>
    </Wrapper>
  );
};

export default NewPetForm;
