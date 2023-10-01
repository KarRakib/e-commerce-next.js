import prisma from "@/prisma/connectPrisma";
import { NextResponse } from "next/server";
export const POST = async (req) => {
    const { title,
        description,
        category,
        style,
        size,
        inventory,
        color,
        price,
        images,
        userId,
        store, } = await req.json();
    try {
        await prisma.product.create({
            data: {  title,description,category,style,size,inventory,color,price,images,userId,store}
        });
        return NextResponse.json({message:'product create Ok', status:201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:error.message, status:501})
    }
}