'use client'
import classes from "./UserInfoNavItem.module.css";
import { useState } from "react";
function UserInfoNavItem(props) {
  //m-2 rounded-l-lg bg-${isActive1?"cyan":"white"}-700
  // const [isActive1,SetActive1]=useState(false)
  const navItemClasses = [` decoration-none !p-0 my-3`];
  if (props.active) {
    navItemClasses.push(classes.active);
  }

  return <li 
  // onClick={()=>{
  //   SetActive1(!isActive1)}}
  className={navItemClasses.join(" ")}>{props.children}</li>;
}

export default UserInfoNavItem;
