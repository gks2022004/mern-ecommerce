// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51Pb6mRRoOiYKNEF2YHJtiqaqA8cvPJ2S2SEd5yZBMscb08Ejj8aw0R6lYNqND3pGtFeka1FuRi6Ju7eNvP9NCR9R00jYqZH4k2");

const Cart = () => {
  const { cartItems, decreaseCartItemQuantity, addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (cartItems.length === 0) {
    return <div className='text-black text-3xl text-center my-72'>Your cart is empty.</div>;
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.priceIncents * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    const stripe = await stripePromise;

    const transformedItems = cartItems.map(item => ({
      name: item.name,
      priceIncents: item.priceIncents,
      quantity: item.quantity,
      image: item.image,
    }));

    try {
      const response = await axios.post(`http://localhost:3000/stripe/create-checkout-session`, {
        products: transformedItems,
      });

      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (error) {
        console.error('Error during Stripe checkout redirection: ', error);
        setError('There was an error during the checkout process. Please try again.');
      }
    } catch (error) {
      console.error('Checkout process error:', error);
      setError('There was an error during the checkout process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4 mt-16 max-w-[1400px] mx-auto'>
      <h2 className='text-2xl font-semibold text-center my-6'>Shopping Cart</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {cartItems.map((item, index) => (
          <div key={index} className='bg-base-200 rounded-lg shadow-lg p-4 flex flex-col'>
            <img src={item.image} alt={item.name} className='rounded-md mb-4 w-full h-64 object-cover' />
            <h2 className='text-lg font-bold mb-2'>{item.name}</h2>
            <p className='text-md mb-1'>Price: ${(item.priceIncents / 100).toFixed(2)}</p>
            <div className='flex items-center justify-between text-md mb-3'>
              <p>Quantity: {item.quantity}</p>
              <div className='flex items-center'>
                <button onClick={() => decreaseCartItemQuantity(item._id)}
                        className='font-bold hover:underline'>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='text-center mt-8'>
        <p className='text-2xl font-semibold mb-4'>Total Price: ${(totalPrice / 100).toFixed(2)}</p>
        <button onClick={handleCheckout} className='btn btn-accent' disabled={loading}>
          {loading ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
};

export default Cart;
