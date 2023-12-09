'use client';

import { Footer } from 'flowbite-react';

function FooterComponent() {
  return (
    <div className="w-full py-6 mb-0 sm:flex sm:items-center sm:justify-between">
      <div className="w-full text-center "> 
           
        <Footer.Divider />
        <Footer.Copyright className="text-white" href="#" by="Indah Sutriyati" year={2023} />
      </div>
    </div>
  );
}

export default FooterComponent;
