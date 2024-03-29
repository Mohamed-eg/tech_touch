"use client"
import type { NextPage } from "next";
import AllProducts from "./allProducts";
import { useTranslation } from "react-i18next";
const ExploreOurProducts: NextPage = (props: any) => {
  const [t, i18n] = useTranslation("global")
  return (
    <div className={`flex flex-col justify-start gap-[60px] text-left text-base text-primary1 font-title-20px-semibold`}>
      <div className=" flex flex-row w-full items-end justify-start ">
        <div className=" flex flex-col w-full items-start justify-start gap-[20px]">
          <div className=" flex flex-row items-center justify-start gap-[16px]">
            <div className="relative w-5 h-10">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded bg-primary1" />
            </div>
            <div className="relative leading-[20px] font-semibold">
              {t("products.title")}
            </div>
          </div>
          <h1 className="m-0 relative text-17xl tracking-[0.04em] leading-[48px] font-semibold font-heading-24px-semibold text-text2 max-md:text-xl max-md:w-full">
            {t("products.h1")}
          </h1>
        </div>
        <div className=" flex flex-row items-start justify-start gap-[8px]">

        </div>
      </div>
      <AllProducts />
    </div>
  );
};

export default ExploreOurProducts;
