// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';


const Home = () => {

const [product,setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const latestProducts = product.slice(0, 3);

  return (
    <><div className='p-4 max-w-[1300px] mx-auto my-16'>
      <div className='hero-content text-center mb-24'>
        <div className='max-w-md'>

          <h1 className='text-5xl font-bold'>
            Welcome to <span className='text-teal-700'>our pathshala</span>
          </h1>
          <p className='py-6'>We have the best courses for you. </p>
          <Link to='/shop' className='btn btn-accent mt-4'>Shop</Link>
         
        </div>
      </div>
    </div><ProductCard product={latestProducts} /></>
  )
}

export default Home
