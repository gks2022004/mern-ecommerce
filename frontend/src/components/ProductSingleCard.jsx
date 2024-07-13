/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useCart } from '../context/CartContext';

const ProductSingleCard = ({product}) => {
   
  const { addToCart, removeFromCart, cartItems } = useCart();

  const itemInCart = cartItems.find((i) => i._id === product._id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product._id);
  };



  return (
    <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={product.image} alt={product.name} className='w-full h-[200px] object-cover'
     />
  </figure>
  <div className="card-body bg-base-200">
    <h2 className="card-title">{product.name}</h2>
    <p>{product.description || 'No description available.'}</p>
    <div className="price">${(product.priceIncents/100).toFixed(2)}</div>

    <div className='card-actions justify-end'>

    {quantity > 0 ? (
      <button className='btn btn-error' onClick={handleRemoveFromCart}>
        Remove from cart</button>
    ) : (
      <button className='btn btn-primary' onClick={handleAddToCart}>
        Add to cart
      </button>
    )}

    </div>
    </div>
  </div>
  );
};

export default ProductSingleCard
