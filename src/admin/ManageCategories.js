import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { delCategory, getCategories } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

export const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => preload(), []);

  const deleteCategory = (categoryId) => {
    delCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage categories here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-success rounded" to={`/admin/dashboard`}>
        <span className="/admin">Admin Home</span>
      </Link>
      <div className="row bg-white">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

          {categories.map((categories, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-dark text-left">{categories.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success rounded"
                    to={`/admin/category/update/categoryId`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteCategory(categories._id);
                    }}
                    className="btn btn-danger rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};
