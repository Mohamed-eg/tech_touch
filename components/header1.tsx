"use client"
import type { NextPage } from "next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "react-i18next";
import { useState } from "react";


const Header1: NextPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [t, i18n] = useTranslation("global")
  const handleLangChange = (e: any) => {
    console.log("heeeeeeeeee")
    setSelectedOption(e.target.value);
    console.log(e)
    i18n.changeLanguage(e.target.value)
  }
  return (
    <header
      className="flex justify-center items-center bg-primary1 w-full h-12 overflow-hidden  text-center text-sm text-secondary-colors-white font-title-20px-semibold"
      id="topHeader"
    >
      <div className="w-full flex flex-row items-center justify-around">
        <div className=" flex flex-row items-center justify-start gap-[8px] m-auto">
          <p className="m-0 relative leading-[21px] inline-block h-[18px] max-md:hidden">
            {t("header.topHeader")}
          </p>
          <a
            className="[text-decoration:underline] relative leading-[24px] font-semibold text-[inherit] text-center"
            href={'#'}
          >
            {t("header.topHeaderSpan")}
          </a>
          <span className="w-[24px]"> <FontAwesomeIcon icon={faArrowDownWideShort} /></span>
        </div>
        <select value={selectedOption} onChange={handleLangChange} className="bg-[transparent] [border:none] mr-[136px] max-md:mr-5 py-[1.5px] px-1 font-title-20px-semibold text-sm text-secondary-colors-white" >
          <option className="text-black p-1 cursor-pointer" value={"en"}><button onClick={() => { handleLangChange("en") }}>English</button></option>
          <option className="text-black p-1 cursor-pointer" value={"ar"}><button onClick={() => { handleLangChange("ar") }}>Arabic</button></option>
        </select>
      </div>
    </header>
  );
};

export default Header1;
