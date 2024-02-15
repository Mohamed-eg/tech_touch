'use client'
import axios from "axios";
import { useState,useEffect } from "react";
import classes from "./UserInfoDetail.module.css";
import { useSearchParams } from 'next/navigation';

function UserInfoDetail() {
  const searchParams = useSearchParams();
  const userID = searchParams.get('uid');
  const [mydate,setData]=useState([])

  const getmydata = async () => {
    console.log(userID)
    try {
      const response = await axios.get(`https://backend.touchtechco.com/userGen?coll=orders&userId=${userID}`);
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
            <th scope="col">Order Number</th>
            <th scope="col">Date</th>
            <th scope="col">Total Price</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
      {mydate?.map((order)=>{return( 
         <tr key={orde?.id}>
            <th scope="row">{order.id}</th>
            <td>{order.data}</td>
            <td>{order.price}</td>
            <td>{order.completed}</td>
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

export default UserInfoDetail;
