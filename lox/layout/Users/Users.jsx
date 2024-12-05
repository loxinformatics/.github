"use client";

import Image from "next/image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import style from "./Users.module.css";
import { useUsersContext } from "./context";

export default function Users({ type }) {
  const version = process.env.NEXT_PUBLIC_USERS_VERSION || "V1";
  const { users, administrators, standard_users } = useUsersContext;

  let filteredUsers = [];

  switch (type) {
    case "administrators":
      filteredUsers = administrators;
      break;
    case "students":
      filteredUsers = standard_users;
      break;
    default:
      filteredUsers = users;
  }

  return (
    <Row className="gy-5">
      {filteredUsers.map((user) => (
        <Col
          md={6}
          lg={version === "V2" ? 3 : 4}
          key={user.username}
          className={`position-relative align-items-stretch d-flex`}
        >
          <div className={style[`${version}_member`]}>
            <div className={style[`${version}_member-img`]}>
              <Image
                src={user.image || "/img/default_profile.jpg"}
                width={600}
                height={600}
                className="img-fluid"
                priority={true}
                alt="user profile image"
              />
              <div className={style[`${version}_social`]}>
                <a href="#" target="_blank">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" target="_blank">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" target="_blank">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" target="_blank">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
            <div className={`${style[`${version}_member-info`]} text-center`}>
              <h4>
                {user?.first_name} {user?.last_name}
              </h4>
              <span>{user?.role}</span>
              <p>
                {user.description ||
                  "Aliquam iure quaerat voluptatem praesentium possimus unde laudantium vel dolorum distinctio dire flow"}
              </p>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}
