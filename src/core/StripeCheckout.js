import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

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
    products &&
      products.map((p) => {
        amount = amount + p.price;
      });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripePayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS ", status);
        emptyCart();
      })
      .catch((err) => console.log(err));
  };

  const stripeBtn = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey={process.env.REACT_APP_KEY}
        token={makePayment}
        amount={getTotalPrice() * 100}
        name="Buy T-shirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success rounded">Pay With Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning rounded">Signin First!</button>
      </Link>
    );
  };

  return (
    <div>
      <h2 className="text-white">Stripe Checkout ${getTotalPrice()}</h2>
      {stripeBtn()}
    </div>
  );
};
