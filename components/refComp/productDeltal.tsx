
"use client"
import Image from "next/image"
import deliveryIcon from "../../public/productImg/icon-delivery.png"
import ReturnDelivery from "../../public/productImg/Icon-return.png"
import Link from "next/link"
import { addToCart } from '../../src/redux/slices/productsSlice';
import { addToList } from '../../src/redux/slices/wishListSlice';
import cartIcon from '../../public/Buy.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { toColor } from "../../functions";
import axios from "axios";
import { useEffect, useId, useState } from "react";
import { generateUniqueId } from "../../functions";
import { auth } from "../../src/firebase/firebase"
import { useSearchParams, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { v4 as uuidv4 } from 'uuid';
const ProductDeltal = (producDeta: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('id');
  const uid = auth.currentUser?.uid
  const milliseconds = Date.now();
  const isoDate = new Date(milliseconds).toISOString();
  const randomeId = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
  const [myproduct, setMyproduct] = useState({
    "_id": "",
    "id": "",
    "title": "",
    "shortDesc": "",
    "longDesc": "",
    "userPrice": 0,
    "middlePrice": 0,
    "traderPrice": 0,
    "colors": [
      {
        "color": "4279209220.0",
        "images": [
          "/loading.png",
          "/loading.png",
          "/loading.png",
          "/loading.png",
          "/loading.png",
          "/loading.png",
          "/loading.png",
          "/loading.png",
          "/loading.png",
          "/loading.png",
          "/loading.png",
          "/loading.png",
          "/loading.png"
        ]
      }
    ],
    "categoryId": "1",
    "discount": null
  })

  const user = useSelector(
    (state: any) => state.user.user
  );
  const showedPrice = (p: any) => {
    switch (user?.userType) {
      case "middle":
        return p.middlePrice;
      case "trader":
        return p.traderPrice;
      default:
        return p.userPrice;
    }

  }
  const [color, setColor] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [SimilarProducts, setSimilarProducts] = useState([])
  const userId = useSelector((state: any) => state.categories.currentUser)

  const getmyproduct = async () => {
    try {
      const response = await axios.get(`https://backend.touchtechco.com/product?id=${query}`);
      setMyproduct(response.data.data);
      // return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      // return null;
    }
  }; searchParams
  const getSimilarProducts = async () => {
    try {
      const response = await axios.get(`https://backend.touchtechco.com/getSimilarProducts?id=${query}`);
      setSimilarProducts(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  useEffect(() => {
    if (query) {
      getmyproduct().then((res) => {
        console.log(res)
      }) // Call the getmyproduct function only if query is truthy
      getSimilarProducts().then((res) => {
        console.log(res)
      }); // Call the getmyproduct function only if query is truthy
    }
  }, [query])

  const postCart = async (id: any, quantity: any, color: any, image: any, title: any, short: any, long: any, price: any) => {
    console.log(isoDate, uid)
    try {
      const response = await axios.post(
        `https://backend.touchtechco.com/gen?coll=cart`,
        {
          "id": randomeId,
          "productId": id,
          "quantity": quantity,
          "color": color,
          "createdAt": isoDate,
          "imageLink": image,
          "productName": title,
          "shortDesc": short,
          "longDesc": long,
          "currentPrice": price,
          "userId": uid
        }
      );
      console.log(uid)
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  const myList = useSelector((state: any) => state.wishList.List)
  // const myid = producDeta.producDeta.params.id
  const dispatch = useDispatch()
  const AllProducts = useSelector((state: any) => state.categories.allproducts)
  const cart = useSelector((state: any) => state.products.cart)
  // const mypage = AllProducts.find((page: any) => { return (page.find((product: any) => { return (product.id == myid) })) });

  const handelSubmit = (e: any, id: any, quantity: any, color: any, image: any, title: any, short: any, long: any, price: any) => {
    if (uid) {
      e.preventDefault()
      console.log(id, quantity, color, image, title, short, long, price)
      quantity > 0 && color && postCart(id, quantity, color, image, title, short, long, price).then((res) => {
        alert(`👍 you have added ${quantity} ${title} to cart 🛒`)
        console.log(res);
      });
      quantity > 0 && color && dispatch(addToCart({ id, quantity, color, imageLink: image, title, short, long, currentPrice: price }))
      console.log(cart)
    }
    else {
      alert(`Pleas sign in first 🔑`)
      router.push('/login')
    }
  }
  return (
    <>
      <section className="relative w-full mt-[200px] mb-[50px] overflow-hidden flex flex-col items-center justify-center">
        <div className="text-xl font-extrabold text-start px-5 w-full text-primary1"><span>Home</span><span> / {myproduct?.title}</span></div>
        <div className="flex flex-row max-lg:!flex-col p-12 justify-center items-start ">
          <div className="flex w-[50%] max-lg:!w-full flex-row">
            <div className="flex flex-col mr-5 max-lg:mr-4 max-md:mr-2 max-sm:mr-1 w-[25%]">
              <div className=" rounded-xl flex items-center justify-center mb-[20px] max-lg:mb-3 max-md:mb-2 max-sm:mb-1 bg-slate-100"><Image className="w-full h-[100%] object-cover rounded-lg" alt="product" width={120} height={120} src={myproduct?.colors[0]?.images[1]}></Image></div>
              <div className=" rounded-xl flex items-center justify-center mb-[20px] max-lg:mb-3 max-md:mb-2 max-sm:mb-1 bg-slate-100"><Image className="w-full h-[100%] object-cover rounded-lg" alt="product" width={120} height={120} src={myproduct?.colors[0]?.images[2]}></Image></div>
              <div className=" rounded-xl flex items-center justify-center mb-[20px] max-lg:mb-3 max-md:mb-2 max-sm:mb-1 bg-slate-100"><Image className="w-full h-[100%] object-cover rounded-lg" alt="product" width={120} height={120} src={myproduct?.colors[0]?.images[3]}></Image></div>
              <div className=" rounded-xl flex items-center justify-center bg-slate-100"><Image className="w-full h-[100%] object-cover rounded-lg" alt="product" width={120} height={120} src={myproduct?.colors[0]?.images[4]}></Image></div>
            </div>
            <div className="w-[75%] rounded-xl flex justify-center items-center bg-slate-100 mx-5 max-lg:mx-3 max-md:mx-3 max-sm:mx-2">
              <Image className="w-full h-[100%] object-cover rounded-xl " alt="product" width={446} height={315} src={myproduct?.colors[0]?.images[0]}></Image>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start ml-16 max-lg:ml-0 w-[30%] max-lg:!w-full text-black">
            <div className="">
              <h1>{myproduct?.title}</h1>
              <h2 className="text-blue text-xl">{`${parseFloat(showedPrice(myproduct).toFixed(2))} EGP`}</h2>
              <p>{myproduct?.longDesc}</p>
            </div>
            <form action="" onSubmit={(event) => handelSubmit(event, myproduct?.id, quantity, color, myproduct?.colors.find((e: any) => e.color === color)?.images[0], myproduct?.title, myproduct?.shortDesc, myproduct?.longDesc, showedPrice(myproduct))}>
              <div>
                <div>
                  <span>Colours</span>
                  <div className="my-[10px] flex flex-wrap w-full text-white ml-[-10px]">
                    {myproduct?.colors.map((e: any) => {
                      return (
                        <div style={{ background: toColor(parseInt(e.color)) }} className={`w-[18px] h-[18px] p-2 flex items-center justify-center rounded-full m-2 !box-content border-[5px] border-solid`}
                          key={`page--product-${myproduct?.id}`}>
                          <input type="radio" className="m-0" name={e.color} checked={e.color === color} value={e.color} onClick={() => {
                            setColor(e.color)
                            if (e.color != color) { setQuantity(0) }
                          }} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-row mt-4 items-center">
                <div>
                  <button className="bg-white p-1 hover:bg-primary1 border-[#eee] px-[5px] border text-lg rounded-l-[8px]" onClick={() => { quantity > 0 ? setQuantity(quantity - 1) : setQuantity(0) }} type="button">➖</button>
                  <span style={{ background: toColor(parseInt(color)) }} className="border-y border-[#eee] px-5 py-2">{quantity || 0}</span>
                  <button type="button" className="bg-white border-[#eee] p-1 text-lg border hover:bg-primary1 rounded-r-[8px]" onClick={() => { setQuantity(quantity + 1) }}>➕</button>
                </div>
                <div>
                  <button type="submit" className="bg-blue cursor-pointer hover:bg-primary1 text-white rounded-xl mx-2 px-10 py-3 border-none outline-none">Add to cart</button>
                  <button type="button" className={`rounded-lg bg-white border p-2 border-[#eee] hover:shadow-lg cursor-pointer outline-none ${myList?.find((p: any) => p.productId === myproduct.id) ? "loved" : "unloved"} `}><FontAwesomeIcon
                    onClick={(mouse_event, id = randomeId, productId = myproduct.id, productData = { title: myproduct.title, userPrice: showedPrice(myproduct), colors: myproduct.colors }, List = myList) => {
                      userId && dispatch(addToList({ id, productId, productData, userId: userId, List }))
                    }}
                    icon={faHeart} className="" /></button>
                </div>
              </div>
            </form>
            <div className="flex flex-col items-start justify-center p-5 mt-8 border border-solid border-[#b1b1b1] rounded-xl ">
              <div className="flex flex-row items-center">
                <Image className="m-3" alt="delivery icon" width={40} height={40} src={deliveryIcon} ></Image>
                <div className="flex flex-col">
                  <h3 className="my-1">Free Delivery</h3>
                  <span className="text-[#aaa] text-[12px]"><Link className="text-[#aaa]" href={"/about"}>Enter your postal code for Delivery Availability</Link></span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <Image className="m-3" alt="delivery icon" width={40} height={40} src={ReturnDelivery} ></Image>
                <div className="flex flex-col">
                  <h3 className="my-1">Return Delivery</h3>
                  <span className="text-[#aaa] text-[12px]">Free 30 Days Delivery Returns. <Link className="text-[#aaa]" href={"/about"}>Details</Link></span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full overflow-hidden flex flex-col items-center justify-center px-24">
        <div><span></span><h2 className="text-primary1 w-full text-left mx-2 ">Related item</h2></div>

        <Swiper
          className="!flex justify-center items-center"
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            740: { slidesPerView: 3 },
            1020: { slidesPerView: 4 },
            1440: { slidesPerView: 5 },
          }}
        >
          {SimilarProducts?.map((product: any) => {
            return (
              <SwiperSlide className=" !w-[170px]" key={product.id}>
                <div className="flex m-5 w-[270px] flex-row group items-center justify-start gap-[16px]" key={`related-${product.id}`}>
                  <div className="relative flex flex-col normal-border w-full leading-[20px] font-semibold">
                    <div className="w-full relative hover: flex flex-col rounded-xl z-0 h-[250px] items-center bg-slate-100 overflow-hidden">

                      <FontAwesomeIcon onClick={(mouse_event, id = randomeId, productId = product.id, productData = { title: product.title, userPrice: showedPrice(product), colors: product.colors }, List = myList) => {
                        userId && dispatch(addToList({ id, productId, productData, userId: userId, List }))
                      }} icon={faHeart} className={`w-[18px] ${myList?.find((p: any) => p.productId === product.id) ? "loved" : "unloved"} cursor-pointer h-[18px] absolute right-2 top-2 text-[#bcbbbb] bg-white p-2 rounded-full`} />
                      <Link href={`/productDeta/id?id=${product.id}`}>
                        <Image width={344} height={250} alt="img" src={product.colors[0]?.images[0]} className="w-full h-[250px]  object-cover" />
                        <div className={`w-[51px] h-[26px] absolute top-2 left-2 rounded-lg text-white text-center leading-[26px] bg-scondry ${!product.isNew && "hidden"} `}>new</div>
                        <button className="w-[270px] h-[40px] absolute text-white  bottom-[-40px] group-hover:bottom-[0px] z-10 text-xl duration-300 p-1 cursor-pointer bg-scondry border-none flex items-center justify-center flex-row"
                        ><Image alt="img" className="w-[24px] mr-[10px] h-[24px]" src={cartIcon} /><p className="m-0">add to cart</p></button>
                      </Link>
                    </div>
                    <div>
                      <p className="text-black">{product.title}</p>
                      <span className="">{`${showedPrice(product)} EGP`}</span>
                    </div>
                    <div className="my-[10px] flex flex-wrap w-full text-white ml-[-10px]">
                      {product.colors.map((e: any) => {
                        return (
                          <div style={{ background: toColor(parseInt(e.color)) }} className={`w-[18px] h-[18px] inline rounded-full m-2 !box-content border-[5px] border-solid`}
                            key={`page-product-${e.color}`}></div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>
    </>
  )
}

export default ProductDeltal
