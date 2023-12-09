import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import { Metadata } from "next"; 
import { Button } from 'flowbite-react'; 
import { HiOutlineArrowLeft } from 'react-icons/hi';
import dynamic from 'next/dynamic'

const AddForm = dynamic(() => import('@/components/GeoData/AddForm'), { ssr: false });

export const metadata: Metadata = {
    title: "Tambah Data Deforestasi Indonesia",
    description: "Halaman Tambah Data Deforestasi Indonesia",
    // other metadata
};

const TambahForm = async () => {
    const data = await getServerSession();
    if (!data) {
        redirect("/")
    }
    return (
        <div className="w-full 2xl:px-30 px-10 pt-10">
            <Button href="/tables" color="dark" className="flex text-white mb-12 flex-wrap w-40">
                <HiOutlineArrowLeft className="mr-4  h-5 w-5" />
                Kembali
            </Button>
            <AddForm />
        </div>
    );
};

export default TambahForm;
