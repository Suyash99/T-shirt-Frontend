import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { addItemCart, removeItemCart } from "./helper/cartHelper";
import ImageRender from "./helper/ImageRender";

const Card = ({
  product,
  addtoCart = true,
  removefromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "Photo Name";
  const cardDescription = product ? product.description : "Photo Description";
  const cardPrice = product ? product.price : "Default";

  const addToCart = () => {
    addItemCart(product, () => setRedirect(true));
  };

  const getARedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddtoCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block rounded btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemovetoCart = (removefromCart) => {
    return (
      removefromCart && (
        <button
          onClick={() => {
            removeItemCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block rounded btn-outline-danger mt-2 mb-2"
        >
          Remove from Cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-success ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getARedirect()}
        <ImageRender product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddtoCart(addtoCart)}</div>
          <div className="col-12">{showRemovetoCart(removefromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
