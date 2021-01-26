import { Breadcrumb } from "@mhshifat/mhs-ui";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DashboardLayout, NewUserForm } from "../components";
import { SectionHeading } from "../styles";
import routes from "./index";

const NewUser = () => {
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
        <SectionHeading>New User</SectionHeading>

        <NewUserForm />
      </div>
    </DashboardLayout>
  );
};

export default NewUser;
