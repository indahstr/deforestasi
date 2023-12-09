import React from 'react';
import TextLanding from '@/components/Text/TextLanding';
import CardLanding from '@/components/Card/CardLanding';
import TextareaLanding from '@/components/Textarea/TextareaLanding';
import FooterComponent from "@/components/Footer/FooterComponent";

function Landing() {
  return (
    <div className='h-full w-full 2xl:px-30 px-10 mt-16 bg-[#2E5B00]  bg-cover bg-top' style={{ backgroundImage: "url('/assets/bg/bg-landingpage.png')"}}>
        <TextLanding/>
        <CardLanding/>
        <TextareaLanding/ >
        <FooterComponent />
    </div>
  );11
};
export default Landing;

