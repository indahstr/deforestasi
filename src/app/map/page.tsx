import dynamic from 'next/dynamic'

const MapComp = dynamic(() => import('@/components/Map/MapComponent'), { ssr: false });

async function Map() {
    return (
        <div className='w-full mt-15'>
            <MapComp />
        </div>
    );
}

export default Map;
