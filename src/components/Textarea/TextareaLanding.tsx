'use client';

import { Textarea, Button } from 'flowbite-react';

function TextareaLanding() {
  return (
    <div className="items-center h-screen">
      <form className="flex-col gap-4">
        <div className="mb-2 block">
          <h5 className="text-2xl mt-56 font-bold tracking-tight text-gray-900 dark:text-white text-center ">
            Laporkan Kegiatan Deforestasi
          </h5>
          <Textarea
            className="mx-auto w-2/3 py-4 bg-[#EBF4EC] border-[#165728] focus:outline-none focus:border-blue-500 mt-5"
          />
          <Button type="submit" className="mx-auto mt-4 bg-[#2E5B00] hover:bg-[#EFBE55] font-semibold text-white">Kirim</Button>
        </div>
      </form>
    </div>
  );
}

export default TextareaLanding;
