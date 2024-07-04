/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react'
import { useSnackbar } from 'notistack';
import { Link , useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { config } from 'dotenv';
import Spinner from '../components/Spinner';

export const EditProduct = () => {

      const [name, setName] = useState("");
      const [priceIncents, setPriceIncents] = useState("");
      const [description, setDescription] = useState("");
    //  const [image, setImage] = useState("");
      const [category, setCategory] = useState("");
      const [loading, setLoading] = useState(false);

      const navigate = useNavigate();
      const { id } = useParams();
      const { enqueueSnackbar } = useSnackbar();

      useEffect(() => {
        setLoading(true);
        axios
          .get(`http://localhost:3000/product/${id}`)
          .then((res) => {
            setName(res.data.name);
            setPriceIncents(res.data.priceIncents);
            setDescription(res.data.description);
            setCategory(res.data.category);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            alert("Something went wrong, Check the console");
          });
      }, [id]); 

      const handleEditProduct = () => {
        const data = { name, priceIncents, description, category };
        setLoading(true);
        axios
            .put(`http://localhost:3000/product/${id}`, data, config)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Product edited successfully", { variant: "success" });
                navigate("/admin");
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("Error", { variant: "error" });
                console.log(error);
            });

        };

  return (
    <div className='p-6 bg-gray-100 flex justify-center items-center'>
        { loading && <Spinner/>}
        <div className='container max-w-lg shadow-lg rounded-lg p-5 bg-base-200'> 
        <Link to="/admin" className='flex justify-center items-center
            btn mb-4 w-12 py-2 px-4 text-sm rounded-xl'>Back</Link>
             <h1 className='text-3xl font-semibold my-4'>Edit Product</h1>
             <div className='my-4'>
             <label htmlFor="name" className='block text-md  mb-2'>Name</label>
                <input 
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border border-base-300 px-4 py-2 w-full rounded-md'    
                />

<label htmlFor="priceIncents" className='block text-md  mb-2'>
                    Price in cents
                </label>
                <input 
                    id="priceIncents"
                    type="number"
                    value={priceIncents}
                    onChange={(e) => setPriceIncents(e.target.value)}
                    className='border border-base-300 px-4 py-2 w-full rounded-md'    
                />
                  <label htmlFor="description" className='block text-md  mb-2'>Description</label>
                <input 
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='border border-base-300 px-4 py-2 w-full rounded-md'    
                />

                <label htmlFor='category' className='block text-lg mb-2 mt-4'>
                    Category
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='w-full border border-base-300 px-4 py-2 rounded-md'
                    required
                >
                    <option value="" disabled>Select category</option>
                    <option value="course">Course</option>
                    <option value="template">Template</option>
                </select>

                <button onClick={handleEditProduct} className='w-full bg-green-500
                                hover:bg-green-800 text-white py-2 px-4 rounded-md mt-4'>
                    Save Changes
                </button>
             </div>
        </div>
    </div>
  )
}

