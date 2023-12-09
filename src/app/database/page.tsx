import DatabaseComponent from '@/components/Database/DatabaseComponent';
import React from 'react';

async function DBPage() {
    return (
        <div className=' mt-14 w-full 2xl:px-30 bg-cover bg-top' style={{ backgroundImage: "url('/assets/bg/bg-data.png')" }}>
            <DatabaseComponent/>
        </div>
    );
};
export default DBPage;