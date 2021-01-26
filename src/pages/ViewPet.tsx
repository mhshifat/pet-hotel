import { Breadcrumb, Button } from "@mhshifat/mhs-ui";
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

const ViewPet = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const { data, loading } = useFetch(
    API_BASE_URL + API_ENDPOINTS.PETS.GET_PET + params.id,
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
        <SectionHeading>View Pet [ {params.id} ]</SectionHeading>

        <ButtonGroups>
          <Link to={`/pets/${params.id}/edit`}>
            <Button size="small">
              <GoPencil />
              Edit
            </Button>
          </Link>
        </ButtonGroups>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Wrapper>
            <div>
              <strong>ID </strong> {data.data.pet._id}
            </div>
            <div>
              <strong>Owner </strong> Pet Owner{" "}
              {`<${data.data.pet.owner.email}>`}
            </div>
            <div>
              <strong>Name </strong> {data.data.pet.name}
            </div>
            <div>
              <strong>Type </strong> {data.data.pet.type}
            </div>
            <div>
              <strong>Bread </strong> {data.data.pet.bread}
            </div>
            <div>
              <strong>Size </strong> {data.data.pet.size}
            </div>
            <div>
              <strong>Bookings </strong> 2021-01-10 18:22 - 2021-01-24 18:22 (In
              Progress)
            </div>
            <div>
              <strong>Created At </strong>{" "}
              {convertTimeToFrom(data.data.pet.createdAt)}
            </div>
            <div>
              <strong>Updated At </strong>{" "}
              {convertTimeToFrom(data.data.pet.updatedAt)}
            </div>
          </Wrapper>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewPet;
