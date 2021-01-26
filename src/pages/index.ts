import React from "react";
import { RouteComponentProps } from "react-router-dom";

export interface IRoute {
  name: string;
  path: string;
  exact?: boolean;
  component: React.FC<RouteComponentProps>;
  routeType: "common" | "public" | "private";
  canAccess: string[];
}

const routes: IRoute[] = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: React.lazy(() => import("./Home")),
    routeType: "private",
    canAccess: ["manager", "employee", "pet_owner"],
  },
  {
    name: "Login",
    path: "/login",
    exact: true,
    component: React.lazy(() => import("./Login")),
    routeType: "public",
    canAccess: ["manager", "employee", "pet_owner"],
  },
  {
    name: "Register",
    path: "/register",
    exact: true,
    component: React.lazy(() => import("./Register")),
    routeType: "public",
    canAccess: ["manager", "employee", "pet_owner"],
  },
  {
    name: "Users",
    path: "/users",
    exact: true,
    component: React.lazy(() => import("./Users")),
    routeType: "private",
    canAccess: ["manager", "employee"],
  },
  {
    name: "New User",
    path: "/users/new",
    exact: true,
    component: React.lazy(() => import("./NewUser")),
    routeType: "private",
    canAccess: ["manager", "employee"],
  },
  {
    name: "View User",
    path: "/users/:id",
    exact: true,
    component: React.lazy(() => import("./ViewUser")),
    routeType: "private",
    canAccess: ["manager", "employee"],
  },
  {
    name: "Edit User",
    path: "/users/:id/edit",
    exact: true,
    component: React.lazy(() => import("./EditUser")),
    routeType: "private",
    canAccess: ["manager", "employee"],
  },
  {
    name: "Pets",
    path: "/pets",
    exact: true,
    component: React.lazy(() => import("./Pets")),
    routeType: "private",
    canAccess: ["manager", "employee", "pet_owner"],
  },
  {
    name: "New Pet",
    path: "/pets/new",
    exact: true,
    component: React.lazy(() => import("./NewPet")),
    routeType: "private",
    canAccess: ["manager", "employee", "pet_owner"],
  },
  {
    name: "View Pet",
    path: "/pets/:id",
    exact: true,
    component: React.lazy(() => import("./ViewPet")),
    routeType: "private",
    canAccess: ["manager", "employee", "pet_owner"],
  },
  {
    name: "Edit Pet",
    path: "/pets/:id/edit",
    exact: true,
    component: React.lazy(() => import("./EditPet")),
    routeType: "private",
    canAccess: ["manager", "employee", "pet_owner"],
  },
  {
    name: "Bookings",
    path: "/bookings",
    exact: true,
    component: React.lazy(() => import("./Bookings")),
    routeType: "private",
    canAccess: ["manager", "employee", "pet_owner"],
  },
  {
    name: "New Booking",
    path: "/bookings/new",
    exact: true,
    component: React.lazy(() => import("./NewBooking")),
    routeType: "private",
    canAccess: ["manager", "employee", "pet_owner"],
  },
  {
    name: "View Booking",
    path: "/bookings/:id",
    exact: true,
    component: React.lazy(() => import("./ViewBooking")),
    routeType: "private",
    canAccess: ["manager", "employee", "pet_owner"],
  },
  {
    name: "Edit Booking",
    path: "/bookings/:id/edit",
    exact: true,
    component: React.lazy(() => import("./EditBooking")),
    routeType: "private",
    canAccess: ["manager", "employee", "pet_owner"],
  },
];

export default routes;
