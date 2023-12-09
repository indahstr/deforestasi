import Landing from './landing/page';
import Dashboard from './dashboard/page';
import { Metadata } from "next";
import { getServerSession } from "next-auth/next"

export const metadata: Metadata = {
    title: "Deforestasi Indonesia",
    description: "Halaman Landing Page",
    // other metadata
};

export default async function Home() {
    const session = await getServerSession();
    return (
        <>
            {session ? (
                <Dashboard />
            ) : (
                <Landing />
            )}
        </>
    )
}
