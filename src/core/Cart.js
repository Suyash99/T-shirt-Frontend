import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import { StripeCheckout } from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>Your Products here</h2>
        {products && products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removefromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  return (
    <Base title="Cart Page" description="Checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">
          <StripeCheckout products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
