// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Success = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        console.log('Payment was successful, clearing cart');
        clearCart();
    }, [clearCart]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100 text-base-content">
            <div className="text-center p-10 rounded-lg shadow-lg bg-base-200">
                <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-lg">Your order has been placed successfully.</p>
            </div>
        </div>
    );
};
Success.displayName = 'Success';
export default Success