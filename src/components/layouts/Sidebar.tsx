import React from "react";
import { AiFillBook } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";
import routes from "../../pages";
import { Wrapper } from "../../styles/sidebar";

const Sidebar = () => {
  const location = useLocation();
  const { authState } = useAuth();

  const links =
    routes.filter(
      (route) =>
        route.path.split("/").length === 2 &&
        route.path !== "/" &&
        route.routeType === "private"
    ) || [];

  const linkIcon = (routeName: string) => {
    switch (routeName) {
      case "Users":
        return <FaUsers />;
      case "Pets":
        return <MdPets />;
      case "Bookings":
        return <AiFillBook />;
      default:
        return <FaUsers />;
    }
  };

  return (
    <Wrapper>
      <div>
        <Link to="/">Pet Hotel</Link>
      </div>
      <ul>
        {links.map(
          (link) =>
            authState.role &&
            link.canAccess.includes(authState.role) && (
              <li
                key={link.name}
                className={
                  location.pathname.includes(link.path) ? "active" : ""
                }
              >
                <Link to={link.path}>
                  {linkIcon(link.name)} {link.name}
                </Link>
              </li>
            )
        )}
      </ul>
    </Wrapper>
  );
};

export default Sidebar;
