import prisma from '@/prisma/connectPrisma'
import { NextResponse } from 'next/server'
export const GET = async(req)=>{
    try {
        const searchParams = new URLSearchParams(req.url.split('?')[1])
        const categories = searchParams.getAll('categories[]')
        const colors = searchParams.getAll('colors[]')
        let sizes = searchParams.getAll('size[]')
        const minPriceStr = searchParams.get('price[min]')
        const maxPriceStr = searchParams.get('price[max]')
        const minPrice = minPriceStr? parseInt(minPriceStr): undefined
        const maxPrice = maxPriceStr? parseInt(maxPriceStr): undefined
        
        const products = await prisma.product.findMany({
            where:{
                OR:[
                    ...categories.map((category) => ({
                        style:{
                            contains:category
                        }
                    })),
                    ...sizes.map((size) => ({
                        style:{
                            contains:size
                        }
                    })),
                    ...colors.map((color) => ({
                        style:{
                            contains:color
                        }
                    })),
                    {
                        price:{
                            get:minPrice,
                            lte:maxPrice
                        }
                    }
                    
                ]
            }
        })
        return NextResponse.json(products)
    } catch (error) {
        console.log("Error selecting product", error)
        return NextResponse.error()
    }
}