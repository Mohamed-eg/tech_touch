"use client"
import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image'
import leftArrow from "../public/fill-with-left-arrow@2x.png"
import rightArrow from "../public/fill-with-right-arrow.svg"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import OnePageProdac from "./refComp/onePageProdac";
import ReactLoading from 'react-loading';


const AllProducts: NextPage = (props: any) => {
  const AllProducts = useSelector((state: any) => state.categories.allproducts);

  return (<>
    {AllProducts ? null : <ReactLoading type={"spinningBubbles"} color={"#79d70a"} height={250} width={250} />}
    <Swiper
      // ref={swiperRef}
      className="!flex justify-center items-cente max-md:!ml-0 mb-36 !w-[80vw]"
      modules={[Navigation, Pagination]}
      spaceBetween={200}
      slidesPerView={1}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{ type: 'fraction' }}
      loop={true}
      watchSlidesProgress={true}>
      <Image alt="img"
        className="relative w-[46px] h-[46px] object-cover swiper-button-prev"
        // onClick={() => swiper.slideNext()}
        src={leftArrow}
      />
      <Image alt="img"
        className="relative w-[46px] h-[46px] object-cover swiper-button-next"
        // onClick={() => swiper.slidePrev()}
        src={rightArrow}
      />
      {AllProducts?.map((PageProducts: any) => {
        { PageProducts ? null : <ReactLoading type={"spinningBubbles"} color={"#79d70a"} height={250} width={250} /> }
        return (
          <SwiperSlide className="!w-[100%]" key={`id${Math.random() * 10}`}>
            {({ isVisible }) => (
              isVisible ? <OnePageProdac PageProducts={PageProducts} /> : null
            )}
          </SwiperSlide>
        )
      })}
    </Swiper>
  </>
  )
};

export default AllProducts;
