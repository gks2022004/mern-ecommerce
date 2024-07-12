// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard';


const Home = () => {

const [product,setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <><div className='p-4 max-w-[1300px] mx-auto mt-16'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>

          <h1 className='text-5xl font-bold'>
            Welcome to <span className='text-teal-700'>our pathshala</span>
          </h1>
          <p className='py-6'>We have the best courses for you. </p>
          <a href='/shop' className='btn btn-primary mt-4'>Shop</a>
        </div>
      </div>
    </div><ProductCard product={product} /></>
  )
}

export default Home
