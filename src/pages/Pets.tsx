import { Breadcrumb, Button, Table, useToaster } from "@mhshifat/mhs-ui";
import React from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import useFetch from "use-http";
import { DashboardLayout } from "../components";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";
import { convertTimeToFrom } from "../helpers/timeStamps";
import { ButtonGroups, SectionHeading } from "../styles";
import routes from "./index";
import { IUser } from "./Users";

export interface IPet {
  _id: string;
  owner: IUser;
  name: string;
  type: string;
  bread: string;
  size: string;
  images: string[];
  createdAt: string;
}

const Pets = () => {
  const history = useHistory();
  const location = useLocation();
  const { toaster } = useToaster();
  const params = useParams<{ id: string }>();
  const fetch = useFetch(API_BASE_URL);
  const { data, loading } = useFetch(
    API_BASE_URL + API_ENDPOINTS.PETS.GET_PETS,
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
        <SectionHeading>Pets</SectionHeading>

        <ButtonGroups>
          <Link to="/pets/new">
            <Button size="small">
              <AiFillPlusSquare />
              New
            </Button>
          </Link>
        </ButtonGroups>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table
            breakOn={1256}
            headings={[
              "ID",
              "Owner",
              "Name",
              "Type",
              "Breed",
              "Size",
              "Created At",
            ]}
            data={data.data.pets.map((pet: IPet) => ({
              id: pet._id,
              owner: pet.owner.firstName + " " + pet.owner.lastName,
              name: pet.name,
              type: pet.type,
              bread: pet.bread,
              size: pet.size,
              createdAt: convertTimeToFrom(pet.createdAt),
            }))}
            onView={(dataId) => history.push(`/pets/${dataId}`)}
            onEdit={(dataId) => history.push(`/pets/${dataId}/edit`)}
            onDelete={(dataId) =>
              fetch.delete(API_ENDPOINTS.PETS.DELETE_PET + dataId).then(() => {
                toaster.error("Successfully deleted pet with id: " + dataId);
                window.location.href = "/pets";
              })
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Pets;
