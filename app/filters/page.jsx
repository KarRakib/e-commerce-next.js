'use client'
import React, {useState, useEffect} from 'react'

import axios from 'axios'
import Link from 'next/link'
import Filter from './Filter'



const Page = () => {
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedSize, setSelectedSize] = useState([])
    const [allHexValues, setAllHexValues] = useState([])
    const [selectedHexValues, setSelectedHexValues] = useState([])
    const [price, setPrice] = useState({
        min:0,
        max:10,
    })
    
    const [response, setResponse] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            try{
                const response = await axios.get('/api/filterproduct',{
                    params:{
                        categories:selectedCategories,
                        size:selectedSize,
                        price:{
                            min:price.min,
                            max:price.max
                        },
                        colors: selectedHexValues
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then((response) => {
                    console.log("response",response.data)
                    setResponse(response.data)
                })
            }catch(error){
                console.log('error', error)
            }
        };
        fetchdata()
    }, [selectedCategories, selectedSize,selectedHexValues,price])

  return (
    <div className='px-5 max-w-[1280px] mx-auto'>
      
        <div className='flex'>
            <div>
                <Filter
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    allHexValues={allHexValues}
                    setAllHexValues={setAllHexValues}
                    selectedHexValues={selectedHexValues}
                    setSelectedAllHexValues={setSelectedHexValues}
                    price={price}
                    setPrice={setPrice}
                    />
            </div>
            <div className='px-10'>
                <h1 className='py-3 text-2xl font-medium'>Filtered Clothings</h1>
                <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12 mt-5'>
                    {response.map((product) => (
                        <div key={product.id}>
                            <Link href={`/dashboard/${product.id}`}>
                                <div className='relative rounded-lg'>
                                    <img src={product.images.split(',')[0]} className='w-[250px] h-[300px] object-cover object-top rounded-lg' alt="" />
                                </div>
                                <div className='flex items-center justify-between mt-4'>
                                    <div>
                                        <h1  className='text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden' >{product.title}</h1>
                                        <p className='text-[13px] opacity-60'>{product.store}</p>
                                    </div>
                                    <span className='px-2 font-medium bg-gray-100 rounded-lg'>${product.price}.00</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page