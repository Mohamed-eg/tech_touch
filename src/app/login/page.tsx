'use client'
import type { NextPage } from "next";
import FooterComp from '../../../components/footer';
import MainHeader from '../../../components/main-header';
import SignIn from '../../../components/refComp/signInForm'


const LogIn: NextPage = () => {
  return (
    <section className="bg-secondary-colors-white w-[1440px] h-[1478px] overflow-hidden text-left text-sm text-secondary-colors-white font-title-20px-medium">
      <MainHeader />
      <SignIn />
      <FooterComp />
    </section>
  );
};

export default LogIn;
