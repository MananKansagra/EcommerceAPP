import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendURL } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category,setCategory] = useState('Seeds & Planting Material');
  const [Subcategory,setSubcategory] = useState('Vegetable Seeds');
  const [bestSeller,setBestseller] = useState(false);
  const [sizes,setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subcategory",Subcategory)
      formData.append("bestSeller", bestSeller ? "true" : "false"); // ✅ Send as string

      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendURL + "/api/product/add",formData,{headers:{token}})
      
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setBestseller('false',false)
      }else{
        toast.error(response.data.message)
      }
      



     


    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

    
  }
























  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
            <p className='mb-2'>Upload image</p>

            <div className="flex gap-2">
                  <label htmlFor="image1" className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg hover:border-blue-500 transition duration-300">
                      <img src={!image1 ?assets.upload : URL.createObjectURL(image1)} alt="" className="w-full h-[80%] opacity-70 hover:opacity-100" />
                      <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
                  </label>

                  <label htmlFor="image2" className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg hover:border-blue-500 transition duration-300">
                      <img src={!image2 ?assets.upload : URL.createObjectURL(image2)} alt="" className="w-full h-[80%] opacity-70 hover:opacity-100" />
                      <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
                  </label>

                  <label htmlFor="image3" className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg hover:border-blue-500 transition duration-300">
                      <img src={!image3 ?assets.upload : URL.createObjectURL(image3)} alt="" className="w-full h-[80%] opacity-70 hover:opacity-100" />
                      <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
                  </label>

                  <label htmlFor="image4" className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg hover:border-blue-500 transition duration-300">
                      <img src={!image4 ?assets.upload : URL.createObjectURL(image4)} alt="" className="w-full h-[80%] opacity-70 hover:opacity-100" />
                      <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
                  </label>
            </div>



        </div>

        <div className='w-full'>
          <p className='mb-2'>Product Name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='type here' required />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
          <div className='w-full'>
            <p className='mb-2'>Product category</p>
            <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-3 py-2' >
              <option value="Seeds & Planting Material">Seeds & Planting Material</option>
              <option value="Fertilizers">Fertilizers</option>
              <option value="Pest Control">Pest Control</option>
              <option value="Gardening Tools">Gardening Tools</option>
              <option value="irrigation">irrigation</option>
            </select>
          </div>

          <div className='w-full'>
            <p className='mb-2'>Product Subcategory</p>
            <select onChange={(e)=>setSubcategory(e.target.value)} value={Subcategory} className='w-full px-3 py-2' >
                <option value="Vegetable Seeds">Vegetable Seeds</option>
                <option value="Fruit Seeds">Fruit Seeds</option>
                <option value="Flower Seeds">Flower Seeds</option>
                <option value="Organic Fertilizers">Organic Fertilizers</option>
                <option value="Chemical Fertilizers">Chemical Fertilizers</option>
                <option value="Bio Fertilizers">Bio Fertilizers</option>
                <option value="Growth Regulators">Growth Regulators</option>
                <option value="Soil Betterment">Soil Betterment</option>
                <option value="Insecticides">Insecticides</option>
                <option value="Fungicides">Fungicides</option>
                <option value="Herbicides">Herbicides</option>
                <option value="Rodenticides">Rodenticides</option>
                <option value="Hand Tools">Hand Tools</option>
                <option value="Power Tools">Power Tools</option>
                <option value="Irrigation Systems">Irrigation Systems</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Product price</p>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='Enter product price here' />
          </div>

        </div>

        <div>
          <p className='mb-2'>Product Sizes</p>

          <div className='flex gap-3'>

            <div onClick={() =>
                setSizes((prev) =>
                  prev.includes("Small") ? prev.filter((item) => item !== "Small") : [...prev, "Small"]
                )
              }>
              <p className={ `${sizes.includes("Small") ? "bg-teal-400" : " bg-slate-200" } px-3 py-1 cursor-pointer ` }>Small</p>
            </div>

            <div onClick={() =>setSizes((prev) =>
                prev.includes("Medium") ? prev.filter((item) => item !== "Medium") : [...prev, "Medium"]
                )}>
            <p className={ `${sizes.includes("Medium") ? "bg-teal-400" : " bg-slate-200" } px-3 py-1 cursor-pointer ` }>Medium</p>
            </div>

            <div onClick={() =>setSizes((prev) =>
                prev.includes("Large") ? prev.filter((item) => item !== "Large") : [...prev, "Large"]
                )} >
              <p className={ `${sizes.includes("Large") ? "bg-teal-400" : " bg-slate-200" } px-3 py-1 cursor-pointer ` }>Large</p>
            </div>

          </div>

        </div>

        <div className='flex -gap-2 mt-2'>
          <input onChange={()=>setBestseller(prev => !prev )} checked={bestSeller} type='checkbox' id='bestseller' />
          <label className='cursor-pointer' htmlFor='bestseller'>Add to Bestseller</label>
        </div>

        <button type='submit' className='bg-black text-white w-28 py-3 mt-3' >Add</button>

    </form>
  )
}

export default Add
