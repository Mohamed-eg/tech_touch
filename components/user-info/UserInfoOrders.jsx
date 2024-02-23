'use client'
import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import { CiLocationOn } from "react-icons/ci";
import { useSearchParams } from 'next/navigation';
import { calc } from '@chakra-ui/react';

const UserInfoOrders = () => {
    let price =0
    const [Data,setData]=useState([])
    let [Tprice,setTprice]= useState(0)
    const searchParams = useSearchParams('');
    const uid = searchParams.get('uid');

    const getTotalPrise = (mycart) => {
        let totalPrise = 0;
        mycart.map((product) => {
          totalPrise += parseInt(product.currentPrice?.toFixed(2)) * parseInt(product.quantity)
        })
        return totalPrise
      }

    const getOrders = async ()=>{
        try {
            const response = await axios.get(`https://backend.touchtechco.com/userGen?coll=orders&userId=${uid}`);
            return response.data.data;
          } catch (error) {
            console.error('Error fetching data:', error);
            return null;
          }
    }
    useEffect(()=>{
        getOrders().then((res)=>{console.log(res)
            setData(res)})
            console.log(Data)
    },[])
    const calcPrice=(cartItems)=>{
        let price = 0
        return    cartItems.map((p)=>{
        return price=+ (parseInt( p.currentPrice)*parseInt(p.quantity)) +0
       })}
  return (
    <div className='w-full bg-slate-50 h-[80vh] overflow-scroll p-6 rounded-xl '>
    {
        Data?.map(
            (cart,index)=>{
               return(
                <div key={cart.id}>
                <div className='flex flex-col justify-center'>
                   <div>
                       <h1>Shipping To</h1>
                       <div className='bg-white p-5 rounded-xl flex flex-row items-center'>
                       <CiLocationOn className='w-12  h-12 m-3 text-primary1' />
                       <div className='flex ml-4 flex-col'>
                           <h2>
                               {()=>getAddress(cart.addressId)}
                               Home
                           </h2>
                           <h3>
                               this is my address
                           </h3>
                       </div>
                       </div>
                   </div>
                   <div className='flex flex-col'>
                   <h1>Product List</h1>
           
           
                  {cart.cartItems.map(
                   (p,index)=>{
                       return(
                           <div key={p.id} className='bg-white flex flex-row justify-between p-5 rounded-xl m-5'>
                           <Image alt='product' className='rounded-xl' width={150} height={150} src={p.imageLink} />
                           <div className='flex flex-col'>
                               <h2>
                                   {p.productName}
                               </h2>
                               <h3>
                                   {p.currentPrice}
                               </h3>
                           </div>
                           <div className='rounded-full flex justify-center items-center w-9 h-9 bg-primary1'>
                               {p.quantity}x
                           </div>
                   
                       </div>
                       )
                   }
                  )}
           
                   <div className='flex flex-col p-5 rounded-xl'>
                       <h1>Payment Info</h1>
                       <div className='flex items-center justify-between flex-row m-2 p-3 bg-white rounded-xl '>
                           <span className='text-[#242424]'>Orderd At</span>
                           <span className='text-[#009099]'>{cart.createdAt}</span>
                       </div>
                       <div className='flex items-center justify-between flex-row m-2 p-3 bg-white rounded-xl '>
                           <span className='text-[#242424]'>Payment Method</span>
                           <span className='text-[#009099]'>Cash</span>
                       </div>
                       <div className='flex items-center justify-between flex-row m-2 p-3 bg-white rounded-xl '>
                           <span className='text-[#242424]'>Price</span>
                           <span className='text-[#009099]'>{getTotalPrise(cart.cartItems)} EGP</span>
                       </div>
                   </div>
           
                   </div>
                 
               </div>
              </div>
               )
            }
        )
    }
    </div>
   
  )
}

export default UserInfoOrders
