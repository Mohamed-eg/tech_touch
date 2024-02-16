'use client'
import axios from "axios";
import { useState,useEffect } from "react";
import classes from "./UserInfoDetail.module.css";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { RiDeleteBin5Fill } from "react-icons/ri";

function UserInfoAddress() {
  const router =useRouter()
  const searchParams = useSearchParams();
  const userID = searchParams.get('uid');
  const [mydata,setData]=useState([])

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

  const handleAdd= async()=>{
    router.push(`/addressForm/uid?uid=${userID}`)
  }

  const DeleteItem=async(id)=>{
    console.log(id)
    try {
      const response = await axios.delete(`https://backend.touchtechco.com/userGen?coll=address&userId=${userID}`,{ data: id });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
  const handleDelete=(id)=>{
    DeleteItem(id).then((res)=>{
      console.log(res)
    })
    }
  
  useEffect(() => {
    getmydata().then((data) => {
      console.log(data)
      if (data != null) { setData(data) }
    })},[])

  return (
    <section className={classes.Main}>
      <div className="w-full h-[80vh] rounded-xl bg-slate-50">
        <button className="rounded-full w-[40px] h-[40px] m-6 bg-scondry border-none" onClick={handleAdd}>➕</button><spa>Add address</spa>
      <table class="table w-full">
        <thead className="w-full">
          <tr className="bg-white w-full p-5 text-[25px] m-5">
            <th scope="col !w-[20%]">Title</th>
            <th scope="col !w-[20%]">Governorate</th>
            <th scope="col !w-[20%]">City</th>
            <th scope="col !w-[20%]">Address</th>
            <th scope="col !w-[20%]">delete Address</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
      {mydata?.map((order)=>{return( 
         <tr className="bg-white rounded-xl p-4 m-4" key={order?.id}>
            <th scope="row">{order?.title}</th>
            <td>{order?.governorate}</td>
            <td>{order?.city}</td>
            <td>{order?.address}</td>
            <td><RiDeleteBin5Fill onClick={()=>{handleDelete(order.id)}} className=" hover:text-rose-600 text-xl cursor-pointer p-4 rounded-xl" /></td>
            {/* <td>
              <a href="#">Order Details</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="#">Reorder</a>
            </td> */}
          </tr>)})
      }

        </tbody>
      </table>
      </div>
    </section>
  );
}

export default UserInfoAddress;
