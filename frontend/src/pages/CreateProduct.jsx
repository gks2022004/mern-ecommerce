/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const CreateProduct = () => {
  
    const [name,setName] = useState('');
    const [priceIncents,setPriceIncents] = useState('');
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('');
    const [image,setImage] = useState(null);
    const [imagePreview,setImagePreview] = useState(null);

    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        if(selectedFile){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile); 
        }else{
            setImagePreview(null);
        }
    };

    
const uploadFile = async () => {
    if (!img) {
        enqueueSnackbar('No image selected', { variant: 'warning' });
        return;
    }

    const data = new FormData();
    data.append('file', img);

    try {
        const uploadUrl = (`http://localhost:3000/upload`);
        const res = await axios.post(uploadUrl, data);

        const { secure_url } = res.data;
        console.log('Uploaded image url: ', secure_url);
        enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
        return secure_url;
    } catch (error) {
        console.error('Upload error', error);
        enqueueSnackbar('Failed to upload an image', { variant: 'error' });
    }
};

    const handleSaveProduct = async () => {
        if (!name || !priceIncents || !category) {
            enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
            return;
        }
    
        const price = parseInt(priceIncents);
        if (isNaN(price) || price <= 0) {
            enqueueSnackbar('Price must be a positive number', { variant: 'warning' });
            return;
        }
    
        setLoading(true);
    
        try {
            const uploadedImageUrl = await uploadFile();
            if (!uploadedImageUrl) {
                throw new Error('Image upload failed');
            }
    
            const formData = {
                name,
                priceIncents,
                description,
                image: uploadedImageUrl,
                category
            };
    
            await axios.post(`hhtp://localhost:3000/product`, formData, config);
    
            enqueueSnackbar('Product saved successfully', { variant: 'success' });
            navigate('/admin');
        } catch (error) {
            console.error('Error:', error);
            enqueueSnackbar('Error saving product: ' + (error.response?.data?.message || error.message), { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };
    
    

  return (
    <div>
      <div className='p-6 bg-gray-100 flex justify-center items-center'>
        { loading && <Spinner/>}
        <div className='container max-w-lg shadow-lg rounded-lg p-5 bg-base-200'> 
        <Link to="/admin" className='flex justify-center items-center
            btn mb-4 w-12 py-2 px-4 text-sm rounded-xl'>Back</Link>
             <h1 className='text-3xl font-semibold my-4'>Create Product</h1>
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
                <label htmlFor='img' className='block text-lg  mb-2'>Upload Image</label>
            <input
                id="img"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className='w-full border border-base-300 px-4 py-2 rounded-md'
                required
            />


            {imgPreview && (
                <div className='my-4'>
                    <img src={imgPreview} alt="Preview" className='max-w-full h-auto' />
                </div>
            )}

                <button onClick={handleSaveProduct} className='w-full bg-green-500
                                hover:bg-green-800 text-white py-2 px-4 rounded-md mt-4'>
                    Save
                </button>
             </div>
        </div>
    </div>
    </div>
  )
}

export default CreateProduct;
