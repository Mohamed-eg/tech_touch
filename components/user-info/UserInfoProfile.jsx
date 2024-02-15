'use client'
import axios from "axios";
import { useState,useEffect } from "react";
import classes from "./UserInfoDetail.module.css";
import { useSearchParams } from 'next/navigation';
import logoImg from "../../public/user@2x.png";
import Message from "../../public/Message.svg";
import Image from "next/image";

const UserInfoProfile = ()=> {
  const searchParams = useSearchParams();
  const userID = searchParams.get('uid');
  const [mydate,setData]=useState({})

  const getmydata = async () => {
    console.log(userID)
    try {
      const response = await axios.get(`https://backend.touchtechco.com/fieldGen?coll=users&filedName=id&filedValue=${userID}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  useEffect(() => {
    getmydata().then((data) => {
      console.log(data)
      if (data != null && data != [] ) { setData(data[0]) }
    })},[])

  return (
    <section className="w-full">
      <div className="flex w-full bg-[#f4f4f4] flex-col items-center rounded-xl justify-center text-black">
        <div className="flex flex-col items-center justify-center">
            <div className="rounded-full flex items-center justify-center scondry_border overflow-hidden w-[100px] h-[100px] mt-5 pt-5">
                <Image alt={mydate?.name} src={/*mydate?.imageLink?mydate.imageLink:*/logoImg} width={100} height={100} className=" object-cover"/>
            </div>
            <h1 className="mb-0">{mydate?.name}</h1>
            <h3 className="mt-0 text-[#a7a7a7]">{mydate?.email}</h3>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col ">
                <label htmlFor="FullName">Full Name</label>
                <div className="flex flex-row jus relative h-[40px] justify-center items-center p-4 bg-white rounded-lg w-[250px]"><input className=" absolute w-full h-full rounded-lg border-none !focus:outline-none !outline-none bg-transparent p-1" id="FullName" type="text" placeholder={mydate?.name}/><Image className="absolute right-2" idth={25} height={25} alt="icon" src={logoImg}/></div>
            </div>
            <div className="flex flex-col ">
                <label htmlFor="Email">Email</label>
                <div className="flex flex-row jus relative h-[40px] justify-center items-center p-4 bg-white rounded-lg w-[250px]"><input className=" absolute w-full h-full rounded-lg border-none !focus:outline-none !outline-none bg-transparent p-1" id="Email" type="text" placeholder={mydate?.email}/><Image className="absolute right-2"width={20} height={20} alt="icon" src={Message}/></div>
            </div>
            <div className="flex flex-col ">
                <label htmlFor="SecondaryPhone">Secondary Phone</label>
                <div className="flex flex-row jus relative h-[40px] justify-center items-center p-4 bg-white rounded-lg w-[250px]"><input className=" absolute w-full h-full rounded-lg border-none !focus:outline-none !outline-none bg-transparent p-1" id="SecondaryPhone" type="text" placeholder={mydate?.secondaryPhone}/></div>
            </div>
            <div className="flex flex-col ">
                <label htmlFor="PrimaryPhone">Primary Phone</label>
                <div className="flex flex-row jus relative h-[40px] justify-center items-center p-4 bg-white rounded-lg w-[250px]"><input className=" absolute w-full h-full rounded-lg border-none !focus:outline-none !outline-none bg-transparent p-1" id="PrimaryPhone" type="text" placeholder={mydate?.primaryPhone}/></div>
            </div>
        </div>
        <div className="flex flex-col">
            <button className="p-4 mt-3 w-[250px] rounded-xl border-none  text-white bg-primary1" type="button">Save</button>
            <button className="p-4 my-3 w-[250px] rounded-xl border-red !border-[1px] text-red bg-white" type="button">Delete Account</button>
        </div>

      </div>
  
    </section>
  );
}

export default UserInfoProfile;
