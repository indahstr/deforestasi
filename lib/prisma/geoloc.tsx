import prisma from ".";

export async function getGeoLocs(tahun_mulai: number) {
    try {
        const res = await prisma.geoLocation.findMany({
            include: {
                geodatas: {
                    where: {
                        tahun_mulai: tahun_mulai,
                    }
                }
            }
        })
        return { res };
    } catch (error) {
        return { error };
    }
}

export async function findGeoCompByPoint(lat: number, lng: number) {
    try {
        const res = await prisma.geoLocation.findRaw({
            filter: {
                "geojs.geometry": {
                    $geoIntersects: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        }
                    }
                }
            }
        });
        return { res };
    } catch (error) {
        return { error };
    }
}