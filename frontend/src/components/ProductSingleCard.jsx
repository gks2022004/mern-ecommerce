import React from 'react'

const ProductSingleCard = ({product}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={product.image} alt={product.name} className='w-full h-[200px] object-cover'
     />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{product.name}</h2>
    <p>{product.description || 'No description available.'}</p>
    <div className="price">${(product.priceIncents/100).toFixed(2)}</div>
    </div>
  </div>
  );
};

export default ProductSingleCard
