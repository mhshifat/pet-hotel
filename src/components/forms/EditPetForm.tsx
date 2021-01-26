import { Button, Input, Select, useForm, useToaster } from "@mhshifat/mhs-ui";
import React, { useEffect } from "react";
import { AiFillSave } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import useFetch from "use-http";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants";
import { IUser } from "../../pages/Users";
import { Wrapper } from "../../styles/newForm";
import { updatePetValidationObject } from "../../validations/index";

const INITIAL_VALUES = {
  id: "",
  owner: "",
  name: "",
  type: "",
  bread: "",
  size: "",
};
const EditPetForm: React.FC<{ id: string }> = ({ id }) => {
  const history = useHistory();
  const { toaster } = useToaster();
  const { put, loading } = useFetch(API_BASE_URL);
  const { data, loading: dataLoading } = useFetch(
    API_BASE_URL + API_ENDPOINTS.PETS.GET_PET + id,
    // @ts-ignore
    { cachePolicy: "no-cache" },
    []
  );
  const { data: usersData, loading: usersDataLoading } = useFetch(
    API_BASE_URL + API_ENDPOINTS.USERS.GET_USERS,
    // @ts-ignore
    { cachePolicy: "no-cache" },
    []
  );
  const {
    formValues,
    handleChange,
    handleSubmit,
    errors,
    reset,
    setValue,
  } = useForm<typeof INITIAL_VALUES>(INITIAL_VALUES, {
    validationSchema: updatePetValidationObject,
  });

  useEffect(() => {
    if (data && !dataLoading) {
      reset({
        id: data.data.pet._id,
        owner: data.data.pet.owner._id,
        name: data.data.pet.name,
        type: data.data.pet.type,
        bread: data.data.pet.bread,
        size: data.data.pet.size,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataLoading]);

  const onSubmit = (stateValues: typeof INITIAL_VALUES) => {
    put(API_ENDPOINTS.PETS.UPDATE_PET + id, stateValues).then((res) => {
      if (!res.success && !res.error.messages) toaster.error(res.error.message);
      if (res.success) {
        toaster.success("Pet has been updated");
        history.push("/pets/" + id);
      }
    });
  };

  return dataLoading && !formValues.id && usersDataLoading && !usersData ? (
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
      <Select
        label="Owner"
        error={errors.owner}
        defaultValue={formValues.owner}
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
        defaultValue={formValues.type}
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
        defaultValue={formValues.size}
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

      <Button disabled={loading} loading={loading} size="small">
        <AiFillSave /> Update
      </Button>
    </Wrapper>
  );
};

export default EditPetForm;
