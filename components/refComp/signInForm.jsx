"use client";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import React,{ useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import LogImg from "../../public/background@2x.png";
// import lock from "../../public/icons/Lock.svg";
// import send from "../../public/icons/Send.svg";
// import message from "../../public/icons/Message.svg";
import {auth} from "../../src/firebase/firebase";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import { setCurrentUser } from "../../src/redux/slices/categoriesSlice";
// import { useRouter } from "next/navigation";
export default function SignIn() {
  const router =useRouter()
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const reduxID =useSelector((state) => state.categories.currentUser)
  
    const onCaptchVerify=()=>{
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              onSignup();
            },
            "expired-callback": () => {},
          }
        );
      }
    }
    useEffect(
      ()=>{
        onCaptchVerify()
      }
    ,[auth])
  
    function onSignup() {
      setLoading(true);
      onCaptchVerify();
  
      const appVerifier = window.recaptchaVerifier;
  
      const formatPh = "+" + ph;
  
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sended successfully!");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    const getmydata = async (userID) => {
      console.log(userID)
      try {
        const response = await axios.get(`https://backend.touchtechco.com/fieldGen?coll=users&filedName=id&filedValue=${userID}`);
        return response.data
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    };
    function onOTPVerify() {
      setLoading(true);
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          const uid =res.user.uid
          console.log(uid);
          setCurrentUser(uid);
          console.log(reduxID)
          getmydata(uid).then((res)=>{
            console.log(res)
            if(res.code===200){
              console.log(res.data)
              if(res.data.length !=0 ){
                toast.success(`Welcome ${res.data.name}`);
                router.push('/')
              }else{toast.success("Please create your account first");
              router.push('/signup')
            } 
            }
            
          })
          setUser(res.user);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }

  return (
    <div className=" mt-[150px] bg-white w-full  flex flex-row-reverse items-center justify-between">
      <div className=" relative w-full">
        <Image
          className="relative w-full"
          src={LogImg}
          alt="shop"
          width={screen.width / 2}
          height={screen.width / 1.8}
        />
        <div className="img-shadow w-full top-0 right-0 min-h-full z-10"></div>
      </div>

      <section className=" w-full m-0 p-0 flex items-center justify-center ">
      <div className="h-[500px] w-[500px] flex items-center justify-center overflow-hidden  bg-primary1 rounded-full">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col items-center justify-center gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /><span className="text-[40px]">Tech Touch</span> 
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"ps"} value={ph} disableDropdown onChange={setPh} />
                <button
                  onClick={onSignup}
                  className=" bg-[#1070af] w-[50%] flex gap-1 items-center border-none m-auto justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
    </div>
  )
}
