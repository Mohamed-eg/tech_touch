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
          <Link href={`../../EditProfile/uid?uid=${userID}`}>
            My Account</Link>
        </UserInfoNavItem>
        <UserInfoNavItem>
          <Link href={`../../MyOrders/uid?uid=${userID}`}>
            My Orders</Link>
        </UserInfoNavItem>
          <UserInfoNavItem>
                <Link href={`../../DeliveryAddress/uid?uid=${userID}`}>
            Delivery Address</Link>
        </UserInfoNavItem>
          <UserInfoNavItem><Link href={`../../Language/uid?uid=${userID}`}>
          Language</Link>
        </UserInfoNavItem>
          <UserInfoNavItem><Link href={`../../PrivacyPolicy/uid?uid=${userID}`}>
          Privacy Policy</Link>
     </UserInfoNavItem>
      </ul>
    </aside>
  );
}

export default UserInfoNav;
