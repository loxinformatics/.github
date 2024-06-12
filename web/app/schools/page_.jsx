"use client";

import { useAuthContext } from "../auth/context";
import PrivateRoute from "@/utils/viewAuthorized";
import Header, {
  Logo,
  NavBarAndMobileNavToggle,
} from "../../components/header/Header";

import Main from "../../components/main/Main";
import Button from "@/widgets/LinkButton/Button";

export default function Schools() {
  const { logoutUser } = useAuthContext();

  return (
    <PrivateRoute>
      <Header position="sticky-top">
        <div className="me-auto">
          <Logo />
        </div>
        <div className="order-last order-lg-0">
          <NavBarAndMobileNavToggle />
        </div>
        <div className="ms-auto">
          <Button name="Home" href="/#hero" />
        </div>
      </Header>

      <Main>
        <p>Schools Page</p>
        <div className="my-5 py-5">
          <button
            className="btn btn-danger"
            onClick={() => {
              logoutUser();
            }}
          >
            Logout
          </button>
        </div>
      </Main>
    </PrivateRoute>
  );
}
