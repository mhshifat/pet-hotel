import {
  Button,
  Select,
  Textarea,
  Uploader,
  useForm,
  useToaster,
} from "@mhshifat/mhs-ui";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { AiFillSave } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import useFetch from "use-http";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants";
import { IPet } from "../../pages/Pets";
import { IUser } from "../../pages/Users";
import { Wrapper } from "../../styles/newForm";
import { createBookingValidationObject } from "../../validations/index";

const INITIAL_VALUES = {
  owner: "",
  pet: "",
  arrival: "",
  departure: "",
  notes: "",
  employeeNotes: "",
  images: [],
};
const NewBookingForm = () => {
  const history = useHistory();
  const { toaster } = useToaster();
  const { post, loading } = useFetch(API_BASE_URL);
  const [petsData, setPetsData] = useState<any>(null);
  const [petsLoading, setPetsLoading] = useState(false);
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
    setValue,
    reset,
  } = useForm<typeof INITIAL_VALUES>(INITIAL_VALUES, {
    validationSchema: createBookingValidationObject,
  });
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  useEffect(() => {
    setPetsLoading(true);
    fetch(API_BASE_URL + API_ENDPOINTS.PETS.GET_PETS)
      .then((res) => res.json())
      .then((res) => {
        setPetsLoading(false);
        setPetsData(res);
      })
      .catch((err) => {
        setPetsLoading(false);
      });
  }, []);

  const onSubmit = (stateValues: typeof INITIAL_VALUES) => {
    post(API_ENDPOINTS.BOOKING.CREATE_BOOKING, stateValues).then((res) => {
      if (!res.success && !res.error.messages) toaster.error(res.error.message);
      if (res.success) {
        toaster.success("New Booking has been created");
        history.push("/bookings");
      }
    });
  };

  return usersDataLoading && petsLoading && !usersData && !petsData ? (
    <p>Loading...</p>
  ) : (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      {usersData && (
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
      )}
      {petsData && (
        <Select
          label="Pet"
          error={errors.pet}
          required
          options={petsData?.data?.pets?.map?.((pet: IPet) => ({
            label: pet.name,
            value: pet._id,
          }))}
          onSelect={(selected) => {
            setValue("pet", selected.value);
            delete errors?.pet;
          }}
        />
      )}
      <DateRange
        editableDateInputs={true}
        onChange={(item: any) => {
          setState([item.selection]);
          reset({
            ...formValues,
            arrival: new Date(item.selection.startDate).toISOString(),
            departure: new Date(item.selection.endDate).toISOString(),
          });
        }}
        moveRangeOnFirstSelection={false}
        // @ts-ignore
        ranges={state}
      />
      <Textarea
        label="Notes"
        name="notes"
        value={formValues.notes}
        onChange={handleChange}
        error={errors.notes}
      />
      <Textarea
        label="Employee Notes"
        name="employeeNotes"
        value={formValues.employeeNotes}
        onChange={handleChange}
        error={errors.employeeNotes}
      />
      <Uploader />

      <Button type="submit" loading={loading} disabled={loading} size="small">
        <AiFillSave /> Save
      </Button>
    </Wrapper>
  );
};

export default NewBookingForm;
