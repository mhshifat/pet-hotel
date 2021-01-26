import {
  Button,
  Input,
  Select,
  Textarea,
  Uploader,
  useForm,
  useToaster,
} from "@mhshifat/mhs-ui";
import React, { useEffect } from "react";
import { AiFillSave } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import useFetch from "use-http";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants";
import { Wrapper } from "../../styles/newForm";
import { updateBookingValidationObject } from "../../validations";

const INITIAL_VALUES = {
  id: "",
  notes: "",
  employeeNotes: "",
  cancellationNotes: "",
  images: [],
  status: "",
};
const EditBookingForm: React.FC<{ id: string }> = ({ id }) => {
  const history = useHistory();
  const { toaster } = useToaster();
  const { put, loading } = useFetch(API_BASE_URL);
  const { data, loading: dataLoading } = useFetch(
    API_BASE_URL + API_ENDPOINTS.BOOKING.GET_BOOKING + id,
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
    validationSchema: updateBookingValidationObject,
  });

  useEffect(() => {
    if (data && !dataLoading) {
      reset({
        id: data.data.booking._id,
        notes: data.data.booking.notes,
        employeeNotes: data.data.booking.employeeNotes,
        cancellationNotes: data.data.booking.cancellationNotes,
        images: data.data.booking.images,
        status: data.data.booking.status,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataLoading]);

  const onSubmit = (stateValues: typeof INITIAL_VALUES) => {
    put(API_ENDPOINTS.BOOKING.UPDATE_BOOKING + id, stateValues).then((res) => {
      if (!res.success && !res.error.messages) toaster.error(res.error.message);
      if (res.success) {
        toaster.success("Booking has been updated");
        history.push("/bookings/" + id);
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
      <Uploader defaultFiles={formValues.images} />
      <Select
        label="Status"
        error={errors.status}
        defaultValue={formValues.status}
        options={[
          {
            label: "Booked",
            value: "booked",
          },
          {
            label: "In Progress",
            value: "in_progress",
          },
          {
            label: "Canceled",
            value: "canceled",
          },
          {
            label: "Completed",
            value: "completed",
          },
        ]}
        onSelect={(selected) => {
          setValue("status", selected.value);
        }}
      />
      <Textarea
        label="Cancellation Notes"
        name="cancellationNotes"
        value={formValues.cancellationNotes}
        onChange={handleChange}
        error={errors.cancellationNotes}
      />

      <Button type="submit" disabled={loading} loading={loading} size="small">
        <AiFillSave /> Update
      </Button>
    </Wrapper>
  );
};

export default EditBookingForm;
