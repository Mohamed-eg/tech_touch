'use client'
import { useState } from "react";
import classes from "./UserInfoNav.module.css";
import UserInfoNavItem from "./UserInfoNavItem";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

function UserInfoNav(props) {
  const [isActive1,SetActive1]=useState(null)
  const [isActive2,SetActive2]=useState(null)
  const [isActive3,SetActive3]=useState(null)
  const [isActive4,SetActive4]=useState(null)
  const [isActive5,SetActive5]=useState(null)
  const [open,setOpen]=useState(false)
  const searchParams = useSearchParams();
  const userID = searchParams.get('uid');
  return (
    <aside className={`w-[250px] rounded-lg ease-in duration-300 bg-white max-md:absolute max-md:h-screen ${open?"":"max-md:ml-[-260px]"}`}>
      <span className="w-full absolute z-10 right-[-40px] top-0 block text-right md:hidden"
      onClick={()=>{
        setOpen(!open)
      }}
      >{open?<span className="w-[50px] h-[50px] rounded-full p-3 bg-white shadow">❌</span>:<span className="w-[50px] h-[50px] rounded-full p-3 bg-white shadow">➕</span>}</span>
      <ul className="list-group  w-[250px]">
        <li
          className="rounded-lg bg-scondry p-2 "
        > 
          <Link className="rounded-lg text-white" href="/">Back to Home</Link>
        </li>
        <UserInfoNavItem>
          <Link
          className="w-full"
          href={`../../EditProfile/uid?uid=${userID}`}>
            <span
             className={`rounded-lg px-3 w-full p-2 bg-${isActive1?"cyan":"white"}-700 ${isActive1?"text-white":''}`}
             active={isActive1} 
             onClick={()=>{
               SetActive1(true)
               SetActive2(false)
               SetActive3(false)
               SetActive4(false)
               SetActive5(false)
             }}> My Account</span>
           </Link>
        </UserInfoNavItem>
        <UserInfoNavItem
        >
          <Link
          className="w-full"
          href={`../../MyOrders/uid?uid=${userID}`}>
            <span
                className={`rounded-lg px-3 w-full p-2 bg-${isActive2?"cyan":"white"}-700 ${isActive2?"text-white":''}`}
                active={isActive2}
                onClick={()=>{
                  SetActive1(false)
                  SetActive2(true)
                  SetActive3(false)
                  SetActive4(false)
                  SetActive5(false)
                }}>My Orders</span>
            
            </Link>
        </UserInfoNavItem>
          <UserInfoNavItem>
                <Link
                className="w-full"
                href={`../../DeliveryAddress/uid?uid=${userID}`}>
              <span
               className={`rounded-lg px-3 w-full p-2 bg-${isActive3?"cyan":"white"}-700 ${isActive3?"text-white":''}`}
               onClick={()=>{
                 SetActive1(false)
                 SetActive2(false)
                 SetActive3(true)
                 SetActive4(false)
                 SetActive5(false)
               }}
               active={isActive3}>
            Delivery Address
            </span></Link>
        </UserInfoNavItem>
          <UserInfoNavItem><Link href={`../../Language/uid?uid=${userID}`}>
            <span
                      className={`rounded-lg px-3 w-full p-2 bg-${isActive4?"cyan":"white"}-700 ${isActive4?"text-white":''}`}
                      onClick={()=>{
                        SetActive1(false)
                        SetActive2(false)
                        SetActive3(false)
                        SetActive4(true)
                        SetActive5(false)
                      }}
                      active={isActive4}>
          Language
          </span></Link>
        </UserInfoNavItem>
          <UserInfoNavItem><Link href={`../../PrivacyPolicy/uid?uid=${userID}`}>
            <span
                      className={`rounded-lg px-3 w-full p-2 bg-${isActive5?"cyan":"white"}-700 ${isActive5?"text-white":''}`}
                      onClick={()=>{
                        SetActive1(false)
                        SetActive2(false)
                        SetActive3(false)
                        SetActive4(false)
                        SetActive5(true)
                      }}
                      active={isActive5}>
          Privacy Policy
          </span></Link>
     </UserInfoNavItem>
      </ul>
    </aside>
  );
}

export default UserInfoNav;
