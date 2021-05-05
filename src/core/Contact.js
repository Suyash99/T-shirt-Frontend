import React from "react";
import { Link } from "react-router-dom";

export const Contact = () => {
  return (
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2>About Me</h2>
        <img
          src="https://i.ibb.co/L8CxPdN/My-picta.png"
          alt="Suyash Kumar's Picture"
          className="border border-info rounded"
          height="320"
          width="320"
        />
      </div>
      <div className="container-fluid bg-white text-dark p-4">
        <p>
          This is a project regarding the fullfillment of my B.Tech(Electronics and
          Communication) Degree. All the products and purchase stated here are
          all for my learning purpose only. Contact Me by clicking on the social
          media buttons below!
        </p>
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-4 col-md-4">
            <a class="btn btn-sm btn-primary rounded" href="https://www.facebook.com/addidaslovers9999/" role="button" target="_blank">Facebook</a>
            </div>
            <div class="col-12 col-sm-4 col-md-4">
            <a class="btn btn-sm btn-dark rounded" href="https://www.instagram.com/suka_blyash/" role="button" target="_blank">Instagram</a>
            </div>
            <div class="col-12 col-sm-4 col-md-4">
            <a class="btn btn-sm btn-info rounded" href="https://twitter.com/F3AR009" role="button" target="_blank">Twitter</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8 offset-md-2 text-center">
        <Link to="/" className="btn btn-success btn-large rounded mb-3">
          Go Back
        </Link>
      </div>
    </div>
  );
};
