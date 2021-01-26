import { Breadcrumb } from "@mhshifat/mhs-ui";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DashboardLayout, NewBookingForm } from "../components";
import { SectionHeading } from "../styles";
import routes from "./index";

const NewBooking = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>();

  return (
    <DashboardLayout>
      <Breadcrumb
        linkComponent={Link}
        routes={routes.map((r) => ({ name: r.name, path: r.path }))}
        pathName={location.pathname}
        params={params}
      />

      <div datatype="main-content">
        <SectionHeading>New Booking</SectionHeading>

        <NewBookingForm />
      </div>
    </DashboardLayout>
  );
};

export default NewBooking;
