'use client';

import { Navbar, Button } from 'flowbite-react';
import { usePathname } from "next/navigation";

function NavbarComponent() {
    const pathname = usePathname();
    if (pathname == "/login") {
        return (null);
    }
    return (
        <Navbar className="bg-[#2E5B00] 2xl:px-30 px-10 text-white" fluid style={{ position: "fixed", width: "100%", zIndex: 100 }}>
            <Navbar.Brand href="/">
                <img src="../images/logo/logo-dark.png" className="mr-3 h-6 sm:h-5" alt="logo" />  
            </Navbar.Brand>
            <div className="flex md:order-2"> 
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Button href="/" className="custom-link bg-[#2E5B00] hover:bg-[#EFBE55] text-white">Home</Button>
                <Button href="/map" className="custom-link bg-[#2E5B00] hover:bg-[#EFBE55] text-white">Maps</Button>
                <Button href="/database" className="custom-link bg-[#2E5B00] hover:bg-[#EFBE55] text-white">Data</Button>
            </Navbar.Collapse>
            {/* <div className="flex md:order-2"></div> */}
        </Navbar>
    );
}

export default NavbarComponent;




