import { Breadcrumb, Button, Chip, Table, useToaster } from "@mhshifat/mhs-ui";
import dayjs from "dayjs";
import React from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import useFetch from "use-http";
import { DashboardLayout } from "../components";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";
import { convertTimeToFrom } from "../helpers/timeStamps";
import { ButtonGroups, SectionHeading } from "../styles";
import routes from "./index";
import { IPet } from "./Pets";
import { IUser } from "./Users";

export interface IBooking {
  _id: string;
  owner: IUser;
  pet: IPet;
  arrival: string;
  departure: string;
  status: string;
  notes?: string;
  employeeNotes?: string;
  cancellationNotes?: string;
  images: string[];
  totalFee: number;
  createdAt: string;
  updatedAt: string;
}

const Bookings = () => {
  const history = useHistory();
  const location = useLocation();
  const { toaster } = useToaster();
  const params = useParams<{ id: string }>();
  const fetch = useFetch(API_BASE_URL);
  const { data, loading } = useFetch(
    API_BASE_URL + API_ENDPOINTS.BOOKING.GET_BOOKINGS,
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
        <SectionHeading>Bookings</SectionHeading>

        <ButtonGroups>
          <Link to="/bookings/new">
            <Button size="small">
              <AiFillPlusSquare />
              New
            </Button>
          </Link>
        </ButtonGroups>

        {loading && !data ? (
          <p>Loading...</p>
        ) : (
          <Table
            breakOn={1256}
            headings={[
              "ID",
              "Owner",
              "Pet",
              "Arrival",
              "Departure",
              "Status",
              "Total Fee",
              "Created At",
            ]}
            data={data.data.bookings.map((booking: IBooking) => ({
              id: booking._id,
              owner: `${booking.owner.firstName} ${booking.owner.lastName}`,
              pet: booking.pet.name,
              arrival: dayjs(booking.arrival).format("MM-DD-YYYY"),
              departure: dayjs(booking.departure).format("MM-DD-YYYY"),
              status: (
                <span style={{ textTransform: "capitalize" }}>
                  <Chip>{booking.status}</Chip>
                </span>
              ),
              totalFee: `${parseFloat(booking.totalFee + "")}`,
              createdAt: convertTimeToFrom(booking.createdAt),
            }))}
            onView={(dataId) => history.push(`/bookings/${dataId}`)}
            onEdit={(dataId) => history.push(`/bookings/${dataId}/edit`)}
            onDelete={(dataId) =>
              fetch
                .delete(API_ENDPOINTS.BOOKING.DELETE_BOOKING + dataId)
                .then(() => {
                  toaster.error(
                    "Successfully deleted booking with id: " + dataId
                  );
                  window.location.href = "/bookings";
                })
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
