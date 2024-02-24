'use client'
import axios from "axios";
import { useState,useEffect } from "react";
import classes from "./UserInfoDetail.module.css";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { MdDelete} from "react-icons/md";

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
      <div className="w-full min-h-[80vh] rounded-xl mx-2s bg-slate-50">
        <button className="rounded-full w-[40px] h-[40px] m-6 bg-scondry border-none" onClick={handleAdd}>➕</button><spa>Add address</spa>
      <table class="table w-full max-md:hidden">
        <thead className="w-full max-md:hidden">
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
            <td><span onClick={()=>{handleDelete(order.id)}} className="text-black hover:text-rose-600 text-[26px] cursor-pointer bg-white shadow-md py-2 px-6 w-4 h-4 rounded-xl" >🗑</span></td>
            {/* <td>
              <a href="#">Order Details</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="#">Reorder</a>
            </td> */}
          </tr>)})
      }

        </tbody>
      </table>
      <div className="w-full flex justify-center p-4 items-start md:hidden flex-col">
      {mydata?.map((order,index)=>{return( 
         <div className="bg-white rounded-xl md:hidden p-4 m-4 shadow-md flex flex-col justify-center items-center w-full" key={order?.id+index}>
          <div className="w-full flex flex-row justify-between items-center"><h4>Title</h4> <span className="p-2" scope="row">{order?.title}</span></div>
          <div className="w-full flex flex-row justify-between items-center"><h4>Governorate</h4> <span className="p-2">{order?.governorate}</span></div>
          <div className="w-full flex flex-row justify-between items-center"><h4>City</h4> <span className="p-2">{order?.city}</span></div>
          <div className="w-full flex flex-row justify-between items-center"><h4>Address</h4> <span className="p-2">{order?.address}</span></div>
          <div className="w-full flex flex-row justify-between items-center"><h4>delete Address</h4> <span className="p-2"><span onClick={()=>{handleDelete(order.id)}} className="text-black hover:text-rose-600 text-[26px] cursor-pointer bg-white shadow-md py-2 px-6 w-4 h-4 rounded-xl" >🗑</span></span></div>
            {/* <td>
              <a href="#">Order Details</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="#">Reorder</a>
            </td> */}
          </div>)})
      }
      </div>
      </div>
    </section>
  );
}

export default UserInfoAddress;
