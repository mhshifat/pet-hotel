export const API_BASE_URL =
  process.env.REACT_APP_API_URI || "http://localhost:5000";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth",
    TOKEN_LOGIN: "/auth/token",
    REGISTER: "/auth/register",
  },
  USERS: {
    GET_USERS: "/users",
    CREATE_USER: "/users",
    GET_USER: "/users/",
    UPDATE_USER: "/users/",
    DELETE_USER: "/users/",
  },
  PETS: {
    GET_PETS: "/pets",
    CREATE_PET: "/pets",
    GET_PET: "/pets/",
    UPDATE_PET: "/pets/",
    DELETE_PET: "/pets/",
  },
  BOOKING: {
    GET_BOOKINGS: "/bookings",
    CREATE_BOOKING: "/bookings",
    GET_BOOKING: "/bookings/",
    UPDATE_BOOKING: "/bookings/",
    DELETE_BOOKING: "/bookings/",
  },
};
