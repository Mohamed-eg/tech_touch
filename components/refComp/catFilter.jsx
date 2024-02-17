"use client";
import { Fragment, useState,useEffect } from "react";
import { addToCart } from "../../src/redux/slices/productsSlice";
import { addToList } from "../../src/redux/slices/wishListSlice";
import { setSelectedProducts } from "../../src/redux/slices/categoriesSlice";
import { setSelectedCategory } from "../../src/redux/slices/categoriesSlice";
import productImg from "../../public/ideapadgaming3i01500x500-1@2x.png";
import { toColor } from "../../functions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
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
import Link from "next/link";
import { auth } from "../../src/firebase/firebase";
import { useSearchParams,useRouter } from 'next/navigation';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
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
    const randomID = uuidv4(); 
    const userId =auth.currentUser?.uid;
const searchParams = useSearchParams();
const query = searchParams.get('catId');
const [Rang,useRang]=useState([]);
  const [Ads,setAds]=useState([])
  const [catProd,setCatProd] = useState([]);
  const [checked,setChecked] = useState(false)
  const MyList = useSelector((state) => state.wishList.List)
  const AllProducts = useSelector((state) => state.categories.allproducts);
  const categories = useSelector((state) => state.categories.allCategories)
  const [color, setColor] = useColor("rgb(86 30 203)");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(true);
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
    const dispatch = useDispatch();
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://backend.touchtechco.com/fieldGen?coll=products&filedName=categoryId&filedValue=${query}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  useEffect(() => {
    fetchProducts().then((data) => {
        console.log(data)
      if (data != null) { setCatProd(data) }
    });

}, [])
  // const fetchCat = async () => {
  //   console.log(selectedCategory)
  //   try {
  //     const response = await axios.get(`https://backend.touchtechco.com/fieldGen?coll=products&filedName=categoryId&filedValue=${selectedCategory}`);
  //     return response.data.data;

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     return null;
  //   }
  // };
  // useEffect(()=>{
  //   fetchCat().then((res)=>{setCatProd(res)
  //     console.log(catProd)})

  // },[selectedCategory])
  const List = useSelector((state) => state.wishList.List);
  return (
    <div className="bg-white ">
      <MainHeader />
      <div>
        {/* Mobile filter dialog */} 

        <main className="mx-auto mt-[200px] max-w-7xl h-screen overflow-y-scroll px-4 sm:px-6 lg:px-8">

          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              explore our products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-900 hover:text-black">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-black"
                                  : "text-gray-900",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}>
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}>
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <div className="lg:col-span-3 ">
                <div className="w-full flex flex-row items-center justify-center flex-wrap">
                  {catProd?null:<h1>there is no product matcheing</h1>}
                  {catProd
                    .map((p) => {
                      return (
                        <div className="flex m-5 w-[240px] h-[450px] flex-row group items-stretch justify-start gap-[16px]" key={`prod-${p.id}`}>
                        <div className="relative flex flex-col normal-border w-full leading-[20px] font-semibold">
            
                          <div className="w-full relative hover: flex flex-col rounded-xl z-0 h-[250px] items-center bg-slate-100 overflow-hidden">
            
                            <FontAwesomeIcon onClick={(mouse_event, id = randomID, productId = p.id, productData = { title: p.title, userPrice: p.userPrice, colors: p.colors }, List = MyList) => {
                              userId && dispatch(addToList({ id, productId, productData, userId: userId, List }))
                            }} icon={faHeart} className={`w-[18px] cursor-pointer ${MyList?.find((ListProduct) => ListProduct.productId === p.id) ? "loved" : "unloved"} h-[18px] absolute right-2 top-2 text-[#cfcfcf] bg-white p-2 rounded-full`} />
                            <Link className=" h-auto w-full object-contain" href={`/productDeta/id?id=${p.id}`}>
                              <div className="object-cover h-auto w-full">
                                <Image alt="img" width={240} height={250} src={p.colors[0].images[0]} className="w-full h-[250px] !rounded-t-lg object-cover " /></div>
            
                              <div className={`w-[51px] h-[26px] absolute top-2 left-2 !rounded-lg text-white text-center leading-[26px] bg-scondry ${!p.isNew && "hidden"} `}>new</div>
            
                              <button /*onClick={(mouse_event, categore = p.categories, id = p.id, name = p.name, url = p.url, prise = p.prise, colors = p.colors[0].color) => dispatch(addToCart({ id, name, url, prise, colors, categore }))}*/
                                className="w-[240px] h-[40px] absolute text-white  bottom-[-40px] group-hover:bottom-[0px] z-10 text-xl duration-300 p-1 cursor-pointer bg-scondry border-none flex items-center justify-center flex-row"
                              ><Image alt="img" className="w-[24px] mr-[10px] h-[24px]" src={cartIcon} /><p className="m-0">add to cart</p></button>
                            </Link>
                          </div>
                          <div>
                            <p className="text-black">{p.title}</p>
                            <span className="">{`${parseFloat(p.userPrice.toFixed(2))} EGP`}</span>
                          </div>
                          <div className="my-[10px] flex flex-wrap w-full text-white ml-[-10px]">
                            {p.colors.map((e) => {
                              return (
                                <div style={{ background: toColor(parseInt(e.color)) }} className={`w-[18px] h-[18px] inline rounded-full m-2 !box-content border-[5px] border-solid`} key={`-p-${p.id}`}></div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                      );
                    })}
                </div>
              </div>
              {/* Filters */}
               <form className="hidden lg:block">
                <h3 className="sr-only">Price 💲</h3>

                <RangeSlider defaultValue={[1000,5000]} value={Rang} min={100} max={100000} step={1} />
                 
                 
                  <Disclosure
                    as="div"
                    key={"useid"}
                    className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              color
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                          <ColorPicker color={color} onChange={setColor} />;
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure
                    as="div"
                    key={"altid"}
                    className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              category
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {categories.map((option, optionIdx) => (
                              <div
                                key={option.title}
                                className="flex items-center">
                                <input
                                  id={`filter-${option.id}-${optionIdx}`}
                                  name={`${option.id}[]`}
                                  defaultValue={option.title}
                                  type="checkbox"
                                  defaultChecked={checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onClick={(e, categoryId = option.id) => {
                                    setChecked(!checked)
                                    dispatch(setSelectedCategory(option.id));
                                  }}
                                />
                                <label
                                  htmlFor={`filter-${option.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-900">
                                  {option.title}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                
              </form> 
            </div>
          </section>
        </main>
      </div>
      <FooterComp />
    </div>
  );
}
