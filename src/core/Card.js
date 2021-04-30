import React from "react";
import ImageRender from "./helper/ImageRender";

const Card = ({ product, addtoCart = true, removefromCart = false }) => {
  const showAddtoCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={() => {}}
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
          onClick={() => {}}
          className="btn btn-block rounded btn-outline-success mt-2 mb-2"
        >
          Remove from Cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-success ">
      <div className="card-header lead">Photo Cate</div>
      <div className="card-body">
        <ImageRender product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          Photo Description
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ 5</p>
        <div className="row">
          <div className="col-12">{showAddtoCart(addtoCart)}</div>
          <div className="col-12">{showRemovetoCart(removefromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
