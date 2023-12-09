'use client';

import React from 'react';
import { Card } from 'flowbite-react';

function CardLanding() {
  return (
    <div>
      <h5 className="text-2xl mt-60 font-bold tracking-tight text-gray-900 dark:text-white text-center">
        Cara Penggunaan
      </h5>
      <div className="grid grid-cols-2 mt-8 gap-10">
        <Card className="max-w-sm justify-self-end bg-[#EBF4EC] border-[#165728]"> 
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Peta Tematik
          </h5>
          <ul className="list-disc pl-4"> 
            <li className="font-normal text-gray-700 dark:text-gray-400">
              Klik dropdown tahun untuk menampilkan peta tematik sesuai Tahun yang dicari.
            </li>
            <li className="font-normal text-gray-700 dark:text-gray-400">
              Hover pada provinsi yang diinginkan, maka peta akan menampilkan informasi geografis tentang deforestasi.
            </li>
          </ul>
        </Card>
        <Card className="max-w-sm bg-[#EBF4EC] border-[#165728]">  
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Data Deforestasi
          </h5>
          <ul className="list-disc pl-4"> 
            <li className="font-normal text-gray-700 dark:text-gray-400">
              Lakukan pencarian data dengan menggunakan fitur search
            </li>
            <li className="font-normal text-gray-700 dark:text-gray-400">
              Database akan menampilkan informasi lengkap mengenai kondisi deforestasi di Indonesia pada setiap provinsi dan tahun.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default CardLanding;
