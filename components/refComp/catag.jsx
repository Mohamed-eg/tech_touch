"use client";
import { Fragment, useState,useEffect } from "react";
import { addToCart } from "../../src/redux/slices/productsSlice";
import { addToList } from "../../src/redux/slices/wishListSlice";
import { setSelectedProducts } from "../../src/redux/slices/categoriesSlice";
import { setSelectedCategory } from "../../src/redux/slices/categoriesSlice";
import productImg from "../../public/ideapadgaming3i01500x500-1@2x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FooterComp from "../footer";
import MainHeader from "../main-header";
import Image from "next/image";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import cartIcon from "../../public/Buy.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import { Pagination,Autoplay } from "swiper/modules";
import slidesImg from "../../public/Photo.png";
import ReactLoading from 'react-loading';
import Link from "next/link";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { setCategories } from "../../src/redux/slices/categoriesSlice";



const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: true },
  { name: "Newest", href: "#", current: true },
  { name: "Price: Low to High", href: "#", current: true },
  { name: "Price: High to Low", href: "#", current: true },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: true },
      { value: "black", label: "Black", checked: true },
      { value: "blue", label: "Blue", checked: true },
      { value: "red", label: "Red", checked: true },
      { value: "green", label: "Green", checked: true },
      { value: "purple", label: "Purple", checked: true },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: true },
      { value: "computer", label: "Computer", checked: true },
      { value: "camera", label: "Camera", checked: true },
      { value: "smartwatch", label: "Smartwatch", checked: true },
      { value: "headphone", label: "Headphone", checked: true },
      { value: "gaming", label: "Gaming", checked: true },
      { value: "taplet", label: "Taplet", checked: true },
      { value: "tools", label: "Tools", checked: true },
      { value: "phone", label: "Phone", checked: true },
      { value: "accessories", label: "Accessories", checked: true },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: true },
      { value: "6l", label: "6L", checked: true },
      { value: "12l", label: "12L", checked: true },
      { value: "18l", label: "18L", checked: true },
      { value: "20l", label: "20L", checked: true },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const isitcheaked = () => {
  return filters.flat().options.checked;
};

export default function Categorypage() {
  const [Ads,setAds]=useState([])
  const [firstAd,setFirstAd]=useState([])
  const [categories,setCategories] = useState(null);
  const [checked,setChecked] = useState(false)
  const AllProducts = useSelector((state) => state.categories.allproducts);
  const [color, setColor] = useColor("rgb(86 30 203)");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(true);
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
    const dispatch = useDispatch();
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`https://backend.touchtechco.com/categories`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
  const fetchAds = async () => {
    try {
      const response = await axios.get(`https://backend.touchtechco.com/ads`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data)
      if (data != null) { dispatch(setCategories(data)) }
    });
    fetchAds().then((data) => {
      console.log(data)
      setAds(data)
    setFirstAd(data[0]) }
    )}, [])
  const List = useSelector((state) => state.wishList.List);
  return (
    <div className="bg-white">
      <MainHeader />
      <div>
        {/* Mobile filter dialog */} 

        <main className="mx-auto mt-[200px] max-w-7xl  px-4 sm:px-6 lg:px-8">
          <div className="w-full !flex justify-center  rounded-xl items-center overflow-hidden">
            <Swiper
              className="!flex justify-center max-md:h-48  !p-0 rounded-xl !w-[100vw] items-center"
              modules={[Pagination , Autoplay]}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: Ads?firstAd.activeSeconds*1000:3000,
                // delay:3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}>
                {Ads.map((Ad)=>{
                  return     <SwiperSlide key={Ad.id} className=" rounded-xl">
                  <Link href={Ad.targetLink?Ad.tatargetLink:"#"}>
                  <Image
                  width={1000}
                  height= {400}
                    alt="img"
                    src={ Ads?Ad.imageUrl:slidesImg}
                    className="rounded-xl cursor-pointer"
                  />
                  </Link>
                </SwiperSlide>
                })

                }
            </Swiper>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              explore our products
            </h1>
          </div>

            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="w-full flex items-center justify-center">
              <div className="w-full">
                <div className="w-full flex flex-row items-center justify-center flex-wrap">
                  {categories?null:<ReactLoading type={"spinningBubbles"} color={"#79d70a"} height={250} width={250} />}
                  {categories
                    .map((category) => {
                      return (
                        <Link className="m-10 " href={`./categ/catId?catId=${category.id}`} key={category.title}>
                        <div className="relative flex flex-col w-[170px] h-[145px] !p-0 items-center cursor-poniter justify-center peer border hover:bg-scondry border-[#0000004d] border-solid rounded-3xl overflow-hidden">
                          <div className="relative w-full h-full leading-[20px] mt-0 hover:text-white font-semibold">
                            <Image width={140} height={80} alt="img" src={category.imageLink} className="text-white w-full m-0 h-full mt-0 rounded-t-lg bg-cover" />
                          </div>
                        </div>
                        <p className="text-[#000] m-0 pb-3 peer-hover:text-scondry">{category.title}</p>
                      </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <FooterComp />
    </div>
  );
}
