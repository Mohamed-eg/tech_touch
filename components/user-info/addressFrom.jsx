'use client'
import axios from "axios";
import { useState,useEffect } from "react";
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';




const AddressForm = () => {

    const milliseconds = Date.now();
    const isoDate = new Date(milliseconds).toISOString();
    const randomeId = uuidv4();
    const searchParams = useSearchParams();
    const userID = searchParams.get('uid');
    const [title,setTitle]=useState('')
    const [gover,setGover]=useState('')
    const [city,setCity]=useState('')
    const [address,setAddress]=useState('')

    const postCart = async ( ) => {
        console.log(isoDate)
        try {
          const response = await axios.post(
            `https://backend.touchtechco.com/gen?coll=address`,
            {
              "id": randomeId,
              "userId": userID,
              "title":title,
              "governorate":gover,
              "city":city,
              "address":address,
              "CreatedAt":isoDate
            }
          );
          console.log(userID)
          return response;
        } catch (error) {
          console.error("Error fetching data:", error);
          return null;
        }
      };
      const handleTitle = (e)=>{
        setTitle(e.target.value)
      }
      const handleGover = (e)=>{
        setGover(e.target.value)
      }
      const handleCity = (e)=>{
        setCity(e.target.value)
      }
      const handleAddress = (e)=>{
        setAddress(e.target.value)
      }
      const handleAdd =()=>{
        postCart().then((res)=>{
          console.log(res)
        })
      }
  return (
    <div className='w-full bg-slate-50 rounded-xl p-5'>
       <form className='flex flex-col items-center'>
       <input onChange={handleTitle} placeholder='Enter Title' className='w-full max-w-80 m-5  bg-white p-3 rounded-xl' type="text" />
        <input onChange={handleGover} placeholder='Enter Governorate' className='w-full max-w-80 m-5  bg-white p-3 rounded-xl' type="text" />
        <input onChange={handleCity} placeholder='Enter City' className='w-full max-w-80 m-5  bg-white p-3 rounded-xl' type="text" />
        <input onChange={handleAddress} placeholder='Enter Address' className='w-full max-w-80 m-5  bg-white p-3 rounded-xl h-20 text-lg' type="textarea"/>
        <button onClick={handleAdd} className='border-none p-3 bg-primary1 rounded-lg text-white' type='button' >Send your address</button>
       </form>
      
    </div>
  )
}

export default AddressForm
