import prisma from "@/config/database";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        
        const { email, password } = await request.json() as User;

        if(!email || !password) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        }); 

        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }

        if(user.password !== password) {
            return NextResponse.json({ message: "Incorrect password" }, { status: 400 });
        }

        return NextResponse.json({
            code: 200,
            message: "User logged in",
            user
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        
    }
}