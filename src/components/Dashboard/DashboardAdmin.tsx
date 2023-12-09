"use client";
import React from "react";
import Charts from "../Charts/Charts"; 
import CardDataStats from "../CardDataStats";
// import Map from "../Maps/TestMap";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
});

const DashboardAdmin: React.FC = () => {
  return (
    <>
  
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Deforestasi Hutan" total="3.000ha">
 
        </CardDataStats>
        <CardDataStats title="Deforestasi APL" total="2.000ha" >
 
        </CardDataStats>
        <CardDataStats title="Total Deforestasi" total="5.000ha">
 
        </CardDataStats>
        <CardDataStats title="Total Provinsi" total="34">
 
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-6 w-full gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Charts /> 
      </div>
    </>
  );
};

export default DashboardAdmin;
