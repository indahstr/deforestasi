import { getGeoDataByID } from "@/lib/prisma/geodata";
import { Button } from 'flowbite-react';
import { HiOutlineArrowLeft } from 'react-icons/hi';

async function DetailData({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) { 
  if (typeof searchParams.id === "string") {
    const { res } = await getGeoDataByID(searchParams.id);
    if (res) {
      return (
        <div
          className="min-h-full h-fit w-full 2xl:px-30 px-10 bg-cover bg-top"
          style={{
            backgroundImage: "url('/assets/bg/bg-detail.png')",
          }}
        >
          <div className="text-left pl-15  mt-40 max-w-xl">
            <div>
            <Button href="/database" color="dark" className="flex text-white mb-12 flex-wrap w-40">
                <HiOutlineArrowLeft className="mr-4  h-5 w-5" />
                Kembali
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Detail Data
            </h1>
            </div>
            
            <p className="text-base md:text-lg text-gray-600 mb-6">
                  <span className="inline-block w-50 font-semibold">Tahun</span>
                            <span className="font-semibold">: {res.tahun}</span><br />
                            <span className="inline-block w-50 font-semibold">Provinsi</span>
                            <span className="font-semibold">: {res.provinsi}</span><br />
                            <span className="inline-block w-50 font-semibold">Kawasan Hutan</span>
                            <span className="font-semibold">: {res.kawasan_hutan}</span><br />
                            <span className="inline-block w-50 font-semibold">Kawasan Bukan Hutan</span>
                            <span className="font-semibold">: {res.bukan_kawasan_hutan}</span><br />
                            <span className="inline-block w-50 font-semibold">Total Deforestasi</span>
                            <span className="font-semibold">: {res.total_deforestasi}</span><br />
                        
            </p>
          </div>
          
        </div>
      );
    }
  }

  return (
    <div
      className="h-[3029px] w-full 2xl:px-30 px-10 bg-cover bg-top"
      style={{
        backgroundImage: "url('/assets/bg/bg-detail.png')",
      }}
    >
      <div className="text-left pl-15 mt-20 max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          No Data
        </h1>
      </div> 
    </div>
  );
}

export default DetailData;
