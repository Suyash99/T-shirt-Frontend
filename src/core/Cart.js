import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadCart);
  }, []);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>Load Products here</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removefromCart={true}
            addtoCart={false}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>Checkout Section</h2>
      </div>
    );
  };
  return (
    <Base title="Cart Page" description="Checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
