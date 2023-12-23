import prisma from ".";

export async function getGeoDatas(take: number, page: number) {
    try {
        const res = await prisma.geoData.findMany({
            skip: (page - 1) * take,
            take: take,
            orderBy: [
                {
                    tahun_mulai: 'asc',
                },
                {
                    id: 'asc',
                },
            ]
        })
        const count = await prisma.geoData.count();
        return { res, count };
    } catch (error) {
        return { error };
    }
}

export async function chart() {
    try{
        const chartData = await prisma.geoData.groupBy({
            by: ['tahun_mulai'],
            _sum: {
            kawasan_hutan: true,
            bukan_kawasan_hutan: true,
            },
            orderBy: [
                {
                    tahun_mulai: 'asc',
                }, 
            ] 
        })
        return { chartData };
    }
    catch (error) {
        return { error };
    }
}


export async function getYear() {
    try {
        const res = await prisma.geoData.findMany({
            distinct: ['tahun_mulai'],
            select: {
              tahun_mulai: true,
            },
            orderBy: [
                {
                    tahun_mulai: 'asc',
                },
                {
                    id: 'asc',
                },
            ] 
        })
  
        return { res };
    } catch (error) {
        return { error };
    }
}

export async function getGeoDataByID(id: string) {
    try {
        const res = await prisma.geoData.findFirst({
            where: {
                id: id
            }
        })
        return { res };
    } catch (error) {
        return { error };
    }
}

export async function getGeoDataByName(name: string, take: number, page: number) {
    try {
        const res = await prisma.geoData.findMany({
            skip: (page - 1) * take,
            take: take,
            where: {
                OR: [
                    {
                        provinsi: {
                            contains: name,
                            mode: "insensitive",
                        },
                    },
                    {
                        tahun_mulai: {
                            equals: isNaN(Number(name)) ? undefined : Number(name),
                        },
                    },
                ],
            },
            orderBy: [
                {
                    tahun_mulai: 'asc',
                },
                {
                    id: 'asc',
                },
            ]
        });
        const count = await prisma.geoData.count({
            where: {
                OR: [
                    {
                        provinsi: {
                            contains: name,
                            mode: "insensitive",
                        },
                    },
                    {
                        tahun_mulai: {
                            equals: isNaN(Number(name)) ? undefined : Number(name),
                        },
                    },
                ],
            },
        });
        return { res, count };
    } catch (error) {
        return { error };
    }
}


export async function addGeoData(id: string, data: any) {
    try {
        const res = await prisma.geoLocation.update({
            where: {
                id: id
            },
            data: {
                geodatas: {
                    create: data
                }
            }
        });
        return { res };
    } catch (error) {
        return { error };
    }
}

export async function editGeoData(id: string, data: any) {
    try {
        const res = await prisma.geoData.update({
            where: {
                id: id
            },
            data: data
        });
        return { res };
    } catch (error) {
        return { error };
    }
}

export async function deleteGeoData(id: string) {
    try {
        const res = await prisma.geoData.delete({
            where: {
                id: id,
            }
        });
        return { res };
    } catch (error) {
        return { error };
    }
}