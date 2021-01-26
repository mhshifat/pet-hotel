import { Breadcrumb, Button, Chip } from "@mhshifat/mhs-ui";
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

const ViewUser = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const { data, loading } = useFetch(
    API_BASE_URL + API_ENDPOINTS.USERS.GET_USER + params.id,
    {},
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
        <SectionHeading>View User [ {params.id} ]</SectionHeading>

        <ButtonGroups>
          <Link to={`/users/${params.id}/edit`}>
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
              <strong>Avatar </strong>{" "}
              <img src={data.data.user.avatar} alt="avatar" />
            </div>
            <div>
              <strong>ID </strong> {data.data.user._id}
            </div>
            <div>
              <strong>Email </strong> {data.data.user.email}
            </div>
            <div>
              <strong>First Name </strong> {data.data.user.firstName}
            </div>
            <div>
              <strong>Status </strong>{" "}
              <span style={{ textTransform: "capitalize" }}>
                <Chip>{data.data.user.status}</Chip>
              </span>
            </div>
            <div>
              <strong>Roles </strong>{" "}
              <span style={{ textTransform: "capitalize" }}>
                {data.data.user.role.replace("_", " ")}
              </span>
            </div>
            <div>
              <strong>Created At </strong>{" "}
              {convertTimeToFrom(data.data.user.createdAt)}
            </div>
            <div>
              <strong>Updated At </strong>{" "}
              {convertTimeToFrom(data.data.user.updatedAt)}
            </div>
          </Wrapper>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewUser;
