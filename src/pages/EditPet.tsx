import { Breadcrumb } from "@mhshifat/mhs-ui";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DashboardLayout, EditPetForm } from "../components";
import { SectionHeading } from "../styles";
import routes from "./index";

const NewPet = () => {
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
        <SectionHeading>Edit Pet</SectionHeading>

        <EditPetForm id={params.id} />
      </div>
    </DashboardLayout>
  );
};

export default NewPet;
