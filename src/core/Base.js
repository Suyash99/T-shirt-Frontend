import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead"> {description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any questions, feel free to reach out</h4>
          <Link
            className="btn btn-warning btn-lg rounded"
            to="/contact"
          >
            <span>Contact</span>
          </Link>
        </div>
        <div className="container">
          <span className="text-muted">
            An Amazing place to buy <span className="text-white">T-Shirt</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
