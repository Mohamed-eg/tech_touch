'use client'
import classes from "./UserInfoNav.module.css";
import UserInfoNavItem from "./UserInfoNavItem";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

function UserInfoNav(props) {
  const searchParams = useSearchParams();
  const userID = searchParams.get('uid');
  return (
    <aside className="w-[300px] rounded-lg bg-white">
      <ul className="list-group ">
        <li
          className="rounded-l-lg bg-cyan-700 p-2 "
        > 
          <Link className="rounded-lg text-white" href="/">Back to Home</Link>
        </li>
        <UserInfoNavItem active>
          <Link href={`../../uid?uid=${userID}/DeliveryAddress`}>
            My Account</Link>
        </UserInfoNavItem>
        <UserInfoNavItem>
          <Link href={`../../uid?uid=${userID}/DeliveryAddress`}>
            My Orders</Link>
        </UserInfoNavItem>
          <UserInfoNavItem>
                <Link href={`../../uid?uid=${userID}/DeliveryAddress`}>
            Delivery Address</Link>
        </UserInfoNavItem>
          <UserInfoNavItem><Link href={`../../uid?uid=${userID}/DeliveryAddress`}>
            Account Info</Link>
        </UserInfoNavItem>
          <UserInfoNavItem><Link href={`../../uid?uid=${userID}/DeliveryAddress`}>
            Feedbacks</Link>
     </UserInfoNavItem>
      </ul>
    </aside>
  );
}

export default UserInfoNav;
