import React from 'react';
import TextLanding from '@/components/Text/TextLanding';
import CardLanding from '@/components/Card/CardLanding';
import Charts from '@/components/Charts/Charts';
// import ChartsProv from '@/components/Charts/ChartsProv';
import TextareaLanding from '@/components/Textarea/TextareaLanding';
import FooterComponent from "@/components/Footer/FooterComponent";

function Landing() {
  return (
    <div className='h-full w-full 2xl:px-30 px-10 mt-16 bg-[#2E5B00] bg-cover bg-top' style={{ backgroundImage: "url('/assets/bg/bg-landingpage.png')"}}>
        <TextLanding/>
        
        
        {/* <ChartsProv/> */}
        <CardLanding/>
        {/* <TextareaLanding/ > */}
        <h5 className="text-2xl mt-56 mb-8 font-bold tracking-tight text-gray-900 dark:text-white text-center ">
          Grafik Perkembangan Deforestasi Indonesia per Tahun
        </h5>
        <div className="z-1200 mb-24">
          <Charts/> 
        </div>
        <FooterComponent />
    </div>
  );
};
export default Landing;

