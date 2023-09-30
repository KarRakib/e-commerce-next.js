

import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import prisma from "@/prisma/connectPrisma";
export const POST = async(req )=>{
    try {
        const {name,email,password} = await req.json();
        console.log(email,name,password);
        if(!name && !email && !password){
          return NextResponse.json({error:'invalid Data', status:422})
        }
       
        const hashedPassword = await bcrypt.hash(password,7)
        const existingUser = await prisma.user.findFirst({where:{email}})
        if(existingUser){
          return NextResponse.json({message:'Email Alrady Exist', status:403})
        }
        await prisma.user.create({
            data: {
              name,
              email,
              password:hashedPassword,
            },
          });
        return NextResponse.json({message:'create Ok', status:201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:error.message, status:501})
    }
    }