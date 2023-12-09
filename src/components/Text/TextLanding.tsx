'use client';

import React from 'react';
import { Button } from 'flowbite-react';

function TextLanding() {
  return (
    <div className="text-left pl-15 mt-40 mb-40 max-w-xl"> {/* Menambahkan padding kiri, margin atas, dan lebar maksimum */}
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">Sistem Informasi Geografis untuk Pemantauan Deforestasi di Indonesia</h1>
      <p className="text-lg md:text-xl text-gray-600">
      Selamat Datang di Pemantauan Deforestasi Hutan Indonesia!
      Pantau angka deforestasi hutan Indonesia dari tahun ke tahun. Mari bersama memahami dan melibatkan diri dalam Pelestarian Hutan untuk Masa Depan Iklim yang Berkelanjutan! </p>
      <Button href="/map" className="mt-4 bg-[#2E5B00] hover:bg-[#EFBE55] w-full md:w-auto md:inline-block py-1 font-semibold text-white">Lihat Peta</Button>
    </div>
  );
}

export default TextLanding;




