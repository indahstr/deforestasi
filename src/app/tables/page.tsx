import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WhiteButton from "@/components/Button/WhiteButton";
import DatabaseAdminComp from "@/components/Database/DatabaseAdminComp";


import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Database",
    description: "Halaman Database Deforestasi Indonesia",
    // other metadata
};

const TablesPage = async () => {
    const data = await getServerSession();
    if (!data) {
        redirect("/")
    }
    return (
        <>
            <div className="w-full 2xl:px-30 px-10 pt-10"> 
                <div className="flex flex-col gap-10">
                    <DatabaseAdminComp />
                </div>
            </div>
        </>
    );
};

export default TablesPage;
