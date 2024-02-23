"use client"
import React, { useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";
import { faBars, faHome, faShop, faStream, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link';

interface NavItemProps {
  text: string;
  icon: IconDefinition;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ text, icon, href }) => {
  return (
    <Link href={href} className="flex items-center px-4 py-2 text-black hover:bg-gray-200">
      <FontAwesomeIcon icon={icon} className="mr-4" />
      <span className="mx-4">{text}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const uid = useSelector((state: any) => state.categories.currentUser)
  const List = useSelector((state: any) => state.wishList.List)
  const cart = useSelector((state: any) => state.products.cart)

  // const getTotalQuantity = () => {
  //   let total = 0
  //   cart?.forEach((item: any) => {
  //     total += item.quantity
  //   })
  //   return total
  // }
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative w-8 h-8 max-md:w-5 max-md:h-5 object-cover cursor-pointer flex items-center justify-center">
      <button className="absolute right-0 text-xl font-bold text-black" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`fixed z-50 right-0 top-0 h-full w-64 overflow-y-auto bg-white shadow-md transition-all duration-300 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute right-0 ml-6 mt-6 text-xl font-bold text-black" onClick={toggleSidebar}>&times;</button>
        <nav className="mt-10">
          {uid ? <span className=" absolute flex w-3 h-3 bg-[#00cc00] rounded-full top-[80px] right-[210px]"></span> : <span className=" absolute flex w-3 h-3 bg-[#a7a7a7] rounded-full top-[-8px] "></span>}

          {cart?.length === 0 ? null : <span className="bg-[#d61414] absolute top-[140px] right-[210px] px-1 text-white rounded-full ">{cart.length || 0}</span>}

          {List?.length ? <span className="bg-[#d61414] absolute top-[180px] right-[210px] px-1 text-sm text-white rounded-full ">{List.length || 0}</span> : null}
          <NavItem text="Home" icon={faHome} href="/" />
          <NavItem text="profile" icon={faUser} href={`/${uid ? "EditProfile/uid?uid=" + uid : "login"}`} />
          <NavItem text="Categories" icon={faStream} href="/categories" />
          <NavItem text="Cart" icon={faShop} href="/card" />
          <NavItem text="wish list" icon={faHeart} href="/wishList" />
          <NavItem text="About" icon={faCog} href="/about" />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;