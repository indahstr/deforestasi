import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import LoginForm from "@/components/Login/LoginForm";

export const metadata: Metadata = {
    title: "Masuk",
    description: "Masuk sebagai Administrator",
    // other metadata
};

const SignIn: React.FC = async () => {
    const data = await getServerSession();
    if (data) {
        redirect("/")
    }
    return (
        <div className="h-screen w-screen 2xl:px-30 grid content-center">
            <LoginForm />
        </div>
    );
};

export default SignIn;
