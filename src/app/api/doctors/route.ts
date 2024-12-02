import prisma from "@/config/database";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {

        const doctors = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                specialty: true,
                email: true,
                phoneNumber: true
            }
        });

        return NextResponse.json({
            message: "Doctors found",
            doctors
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
    
}