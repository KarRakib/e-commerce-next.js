import prisma from '@/prisma/connectPrisma'
import { NextResponse } from 'next/server'
export const GET = async(req)=>{
    try {
        const allColors = await prisma.product.findMany({
            select:{
                color:true
            }
        })
        return NextResponse.json(allColors)
    } catch (error) {
        console.log('Error fetching allcolors', error)
        return NextResponse.error() 
    }
}