import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "./helper/cartHelper";

export const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const { userId, token } = isAuthenticated();

  const getTotalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const stripeBtn = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Pay With Stripe</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin First!</button>
      </Link>
    );
  };

  return (
    <div>
      <h2 className="text-white">Stripe Checkout {getTotalPrice()}</h2>
      {stripeBtn()}
    </div>
  );
};
