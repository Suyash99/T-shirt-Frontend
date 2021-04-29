import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import Base from "../core/Base";
import { update } from "./helper/userapicalls";

const UpdateUser = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    error: "",
    loading: false,
    didRedirect: false,
    success: false,
  });

  const {
    name,
    lastname,
    email,
    error,
    success,
    loading,
    didRedirect,
  } = values;

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link
        className="btn btn-sm btn-success rounded mb-3"
        to="/user/dashboard"
      >
        User Home
      </Link>
    </div>
  );

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    update(user._id, token, { name, lastname, email })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: true,
          });
        } else {
          setValues({
            ...values,
            name: "",
            lastname: "",
            email: "",
            error: "",
            success: true,
            didRedirect: true,
          });
        }
      })
      .catch(console.log("Error in changing user info"));
  };

  const performRedirect = () => {
    setTimeout(() => {
      if (didRedirect) {
        console.log(didRedirect);
        if (user && user.role === 1) {
          return <Redirect to="/admin/dashboard" />;
        } else {
          return <Redirect to="/user/dashboard" />;
        }
      }
    }, 1000);
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">User updated successfully!</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to update user</h4>;
    }
  };

  const updateUserForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">First Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Last Name</label>
              <input
                className="form-control"
                onChange={handleChange("lastname")}
                type="text"
                value={lastname}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="d-grid gap-2 col-6 mx-auto">
              <button onClick={onSubmit} className="btn btn-success rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="User Information update"
      description="Give the information which you want to be changed."
      className="container bg-success p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {successMessage()}
          {warningMessage()}
          {updateUserForm()}
          {goBack()}
          {performRedirect()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateUser;
