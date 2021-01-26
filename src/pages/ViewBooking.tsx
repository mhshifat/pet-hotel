import { Breadcrumb, Button, Chip } from "@mhshifat/mhs-ui";
import dayjs from "dayjs";
import React from "react";
import { GoPencil } from "react-icons/go";
import { Link, useLocation, useParams } from "react-router-dom";
import useFetch from "use-http";
import routes from ".";
import { DashboardLayout } from "../components";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";
import { convertTimeToFrom } from "../helpers/timeStamps";
import { ButtonGroups, SectionHeading } from "../styles";
import { Wrapper } from "../styles/viewData";

const ViewBooking = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const { data, loading } = useFetch(
    API_BASE_URL + API_ENDPOINTS.BOOKING.GET_BOOKING + params.id,
    // @ts-ignore
    { cachePolicy: "no-cache" },
    []
  );

  return (
    <DashboardLayout>
      <Breadcrumb
        linkComponent={Link}
        routes={routes.map((r) => ({ name: r.name, path: r.path }))}
        pathName={location.pathname}
        params={params}
      />

      <div datatype="main-content">
        <SectionHeading>View Booking [ {params.id} ]</SectionHeading>

        <ButtonGroups>
          <Link to={`/bookings/${params.id}/edit`}>
            <Button size="small">
              <GoPencil />
              Edit
            </Button>
          </Link>
        </ButtonGroups>

        {loading && !data ? (
          <p>Loading</p>
        ) : (
          <Wrapper>
            <div>
              <strong>Photos </strong>{" "}
              <img
                className="not-rounded"
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                alt="avatar"
              />
              <img
                className="not-rounded"
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                alt="avatar"
              />
            </div>
            <div>
              <strong>ID </strong> {data.data.booking._id}
            </div>
            <div>
              <strong>Owner </strong> Pet Owner {`<${data.data.booking.email}>`}
            </div>
            <div>
              <strong>Pet </strong> {data.data.booking.pet.name}
            </div>
            <div>
              <strong>Arrival </strong>{" "}
              {dayjs(data.data.booking.arrival).format("MM-DD-YYYY")}
            </div>
            <div>
              <strong>Departure </strong>{" "}
              {dayjs(data.data.booking.departure).format("MM-DD-YYYY")}
            </div>
            <div>
              <strong>Notes </strong>{" "}
              {data.data.booking.notes || "Not Available..."}
            </div>
            <div>
              <strong>Employee Notes </strong>{" "}
              {data.data.booking.employeeNotes || "Not Available..."}
            </div>
            <div>
              <strong>Status </strong>{" "}
              <span style={{ textTransform: "capitalize" }}>
                <Chip>{data.data.booking.status.replace("_", " ")}</Chip>
              </span>
            </div>
            <div>
              <strong>Total Fee </strong>{" "}
              {`$${parseFloat(data.data.booking.totalFee + "")}`}
            </div>
            <div>
              <strong>Created At </strong>{" "}
              {convertTimeToFrom(data.data.booking.createdAt)}
            </div>
            <div>
              <strong>Updated At </strong>{" "}
              {convertTimeToFrom(data.data.booking.updatedAt)}
            </div>
          </Wrapper>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewBooking;
