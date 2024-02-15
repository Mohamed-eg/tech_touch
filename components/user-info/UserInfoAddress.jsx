'use client'
import axios from "axios";
import { useState,useEffect } from "react";
import classes from "./UserInfoDetail.module.css";
import { useSearchParams } from 'next/navigation';

function UserInfoAddress() {
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

  useEffect(() => {
    getmydata().then((data) => {
      console.log(data)
      if (data != null) { setData(data) }
    })},[])

  return (
    <section className={classes.Main}>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Governorate</th>
            <th scope="col">City</th>
            <th scope="col">Address</th>
            <th scope="col">At</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
      {mydata?.map((order)=>{return( 
         <tr key={order?.id}>
            <th scope="row">{order?.id}</th>
            <td>{order?.data}</td>
            <td>{order?.price}</td>
            <td>{order?.completed}</td>
            <td>
              <a href="#">Order Details</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="#">Reorder</a>
            </td>
          </tr>)})
      }

        </tbody>
      </table>
    </section>
  );
}

export default UserInfoAddress;
