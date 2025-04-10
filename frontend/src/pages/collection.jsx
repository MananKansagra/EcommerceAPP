import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const collection = () => {

  const {products ,search , showsearch} = useContext(ShopContext);
  const [ShowFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relevant')

  const togglecategory = (e) =>{
    if(category.includes(e.target.value)){
        setCategory(prev=> prev.filter(item => item !== e.target.value));
    }
    else{
      setCategory(prev=> [...prev, e.target.value]);
    }
  }

  const toogleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value));
      }
      else{
        setSubCategory(prev=> [...prev, e.target.value]);
        }
  }

  const applyFilter = () =>{
    let productCopy = products.slice();

    if (showsearch || search) {
      productCopy = productCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));  
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productCopy)
  
  
  }

  const sortProduct = () =>{
    let fpCOPY = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCOPY.sort((a,b)=>(a.price - b.price)))
        break;


      case 'high-low':
        setFilterProducts(fpCOPY.sort((a,b)=>(b.price - a.price)))
        break;
    
      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
    sortProduct();

  },[sortType])

  useEffect(()=>(
    console.log(category)

  ),[category])

  useEffect(()=>(
    console.log(subCategory)

  ),[subCategory])

  useEffect(() =>{
    applyFilter();
  },[category,subCategory,search,showsearch,products])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/**filter options */}
      <div className='min-w-60'>
        <p onClick={()=> setShowFilter(!ShowFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters 
          <img className={`h-3 sm:hidden ${ShowFilter ? 'rotate-90':''}`} src={assets.FilterIcon}  alt=''/>
        </p>
        {/**category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ShowFilter? '' : 'hidden'} sm:block`}>
          <p className='MB-3 TEXT-SM font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Seeds & Planting Material'}  onChange={togglecategory} />seed & Planting Materials
           </p>

           <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Fertilizers'} onChange={togglecategory}/>Fertilizers
           </p>

           <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Pest Control'} onChange={togglecategory}/>Pest Control
           </p>

           <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Gardening Tools'} onChange={togglecategory}/>Gardening Tools
           </p>

           <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'irrigation'} onChange={togglecategory}/>irrigation
           </p>

          </div>
          
        </div>
        {/**subcategory filter */}
      </div>

      {/**code for rendering and showing products on collection page */}

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'} />
          {/** product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border border-gary-300 text-sm px-2'>
            <option value="relevant">sort by:Relevant</option>
            <option value="low-high">sort by:Price low to high</option>
            <option value="high-low">sort by:Price high to low</option>
          </select>
        </div>
        {/**map products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>


    </div>
  )
}

export default collection
