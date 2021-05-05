import React from 'react'
import { API } from '../../backend'

const ImageRender = ({product}) => {
    const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.unsplash.com/photo-1592632740591-cfa50aeeadad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80`
    return(
        <div className="rounded border border-info p-1">
        <img
          src={imageurl}
          alt="photo"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          className="mb-3 rounded"
        />
      </div>
    )
}

export default ImageRender