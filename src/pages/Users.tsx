import { Breadcrumb, Button, Chip, Table, useToaster } from "@mhshifat/mhs-ui";
import React, { useEffect } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import useFetch from "use-http";
import { DashboardLayout } from "../components";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";
import { convertTimeToFrom } from "../helpers/timeStamps";
import { ButtonGroups, SectionHeading } from "../styles";
import { ProfileImg } from "../styles/index";
import routes from "./index";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  status: string;
  role: string;
  createdAt: string;
}

const Users = () => {
  const history = useHistory();
  const location = useLocation();
  const { toaster } = useToaster();
  const params = useParams<{ id: string }>();
  const fetch = useFetch(API_BASE_URL);
  const { data, loading, cache } = useFetch(
    API_BASE_URL + API_ENDPOINTS.USERS.GET_USERS,
    {},
    []
  );

  useEffect(() => {
    cache.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = (id: string) => {
    fetch.delete(API_ENDPOINTS.USERS.DELETE_USER + id).then((res) => {
      if (!res.success && !res.error.messages) toaster.error(res.error.message);
      if (res.success) {
        window.location.href = "/users";
      }
    });
  };

  return (
    <DashboardLayout>
      <Breadcrumb
        linkComponent={Link}
        routes={routes.map((r) => ({ name: r.name, path: r.path }))}
        pathName={location.pathname}
        params={params}
      />

      <div datatype="main-content">
        <SectionHeading>Users</SectionHeading>

        <ButtonGroups>
          <Link to="/users/new">
            <Button size="small">
              <AiFillPlusSquare />
              New
            </Button>
          </Link>
        </ButtonGroups>

        {loading ? (
          "Loading..."
        ) : (
          <Table
            breakOn={1256}
            headings={[
              "ID",
              "Avatar",
              "Email",
              "Name",
              "Role",
              "Status",
              "Created At",
            ]}
            data={data?.data?.users?.map?.((user: IUser) => ({
              id: user._id,
              avatar: <ProfileImg src={user.avatar} alt="profile" />,
              email: user.email,
              name: user.firstName + " " + user.lastName,
              role: (
                <p style={{ textTransform: "capitalize" }}>
                  {user.role.replace("_", " ")}
                </p>
              ),
              status: (
                <div style={{ textTransform: "capitalize" }}>
                  <Chip>{user.status}</Chip>
                </div>
              ),
              createdAt: convertTimeToFrom(user.createdAt),
            }))}
            onView={(dataId) => history.push(`/users/${dataId}`)}
            onEdit={(dataId) => history.push(`/users/${dataId}/edit`)}
            onDelete={(dataId) => deleteUser(dataId)}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Users;
