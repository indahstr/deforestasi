
import React from "react";
import Charts from "@/components/Charts/Charts";
import ChartsProv from "@/components/Charts/ChartsProv";
import CardDataStats from "@/components/CardDataStats";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { useSession } from "next-auth/react";
// import Map from "../Maps/TestMap";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import { chart } from "@/lib/prisma/geodata";
// import { redirect } from "next/navigation";
const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
    ssr: false,
});

const Dashboard: React.FC = async() => {
    // const { data: session, status } = useSession();
    // if (status == "unauthenticated") {
    //     redirect("/")
    // }
    const { chartData } = await chart();
    console.log(chartData);

    return (
        <div className="w-full 2xl:px-30 px-10 pt-10">
            <Breadcrumb pageName="Dashboard" /> 
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardDataStats title="Deforestasi Hutan" total="83399.3ha" /> 
                <CardDataStats title="Deforestasi APL" total="37306.5ha" /> 
                <CardDataStats title="Total Deforestasi" total="120705.8ha"  /> 
                <CardDataStats title="Total Provinsi" total="34" /> 
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardDataStats title="Deforestasi Tertinggi" total="Kalimantan Timur dan Utara" /> 
                <CardDataStats title="Deforestasi Terendah" total="DIY dan Banten" />  
            </div>

            <div className="mt-4 grid grid-cols-6 w-full gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <Charts />
                {/* <ChartsProv /> */}
            </div>
        </div>
    );
};

export default Dashboard;


