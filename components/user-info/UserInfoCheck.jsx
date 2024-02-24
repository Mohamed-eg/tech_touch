'use client'
import axios from "axios";
import { useState,useEffect } from "react";
import classes from "./UserInfoDetail.module.css";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { Checkbox } from "@chakra-ui/react";
function UserInfoCheck() {
const reandid= uuidv4()
const [mycart,setmycart]=useState(null)
const milliseconds = Date.now();
const isoDate = new Date(milliseconds).toISOString();
  const router =useRouter()
  const searchParams = useSearchParams();
  const userID = searchParams.get('uid');
  const [mydata,setData]=useState([])
const [checkedAdd,setchecked]=useState('')

const getmycart = async () => {
    try {
      const response = await axios.get(`https://backend.touchtechco.com/userGen?coll=cart&userId=${userID}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  const getmydata = async () => {
    console.log(userID)
    try {
      const response = await axios.get(`https://backend.touchtechco.com/userGen?coll=address&userId=${userID}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  
  const postOrder = async () => {
    console.log(isoDate)
    try {
      const response = await axios.post(
        `https://backend.touchtechco.com/gen?coll=orders`,
        {
          "id": reandid,
          "userId": userID,
          "cartItems": mycart,
          "createdAt": isoDate,
          "addressId":checkedAdd
        }
      );
      console.log(userID)
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const getTotalPrise = () => {
    let totalPrise = 0;
    mycart?.map((product) => {
      totalPrise += parseInt(product.currentPrice?.toFixed(2)) * parseInt(product.quantity)
    })
    return totalPrise
  }
  const handleAdd= async()=>{
    router.push(`/addressForm/uid?uid=${userID}`)
  }

  useEffect(() => {
    getmycart().then((res)=>{
        console.log(res)
        if (res!= null) { setmycart(res) }
    })

    getmydata().then((data) => {
      console.log(data)
      if (data != null) { setData(data) }
    })},[])

  return (
    <section className={classes.Main}>
     <div className="w-full mx-2 h-[80vh] rounded-xl bg-slate-50">
     <div className="w-full h-[30vh] rounded-xl bg-slate-50 overflow-scroll">
        <button className="rounded-full w-[40px] h-[40px] m-6 bg-scondry border-none" onClick={handleAdd}>➕</button><spa>Add address</spa>
      <table class="table w-full">
        <thead className="w-full">
          <tr className="bg-white w-full p-5 text-[25px] m-5">
            <th scope="col !w-[20%]">Title</th>
            <th scope="col !w-[20%]">Governorate</th>
            <th scope="col !w-[20%]">City</th>
            <th scope="col !w-[20%]">Address</th>
            <th scope="col !w-[20%]">checked</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
      {mydata?.map((address)=>{return( 
         <tr className="bg-white rounded-xl p-4 m-4" key={address?.id}>
            <th scope="row">{address?.title}</th>
            <td>{address?.governorate}</td>
            <td>{address?.city}</td>
            <td>{address?.address}</td>
            <td><Checkbox onClick={()=>{setchecked(address.id)}} className=" hover:text-rose-600 text-xl w-[40px] h-[40px] text-scondry border-scondry border-2 cursor-pointer p-4 rounded-xl" /></td>
            {/* <td>
              <a href="#">Order Details</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="#">Reorder</a>
            </td> */}
          </tr>)})
      }

        </tbody>
      </table>
      </div>
      <div className='flex flex-col p-5 rounded-xl'>
                       <h1>Payment Info</h1>
                       <div className='flex items-center justify-between flex-row m-2 p-3 bg-white rounded-xl '>
                           <span className='text-[#242424]'>Item Total</span>
                           <span className='text-[#009099]'>{getTotalPrise()} EGP</span>
                       </div>
                       <div className='flex items-center justify-between flex-row m-2 p-3 bg-white rounded-xl '>
                           <span className='text-[#242424]'>Delivery Fee</span>
                           <span className='text-[#009099]'>10 EGP</span>
                       </div>
                       <div className='flex items-center justify-between flex-row m-2 p-3 bg-white rounded-xl '>
                           <span className='text-[#242424]'>Total Price</span>
                           <span className='text-[#009099]'>{`${getTotalPrise() + 10}`} EGP</span>
                       </div>
                       <button type="button" onClick={postOrder} className="p-5 bg-primary1 rounded-xl text-white w-[300px]">Place Order</button>
                   </div>
     </div>
    </section>
  );
}

export default UserInfoCheck;
