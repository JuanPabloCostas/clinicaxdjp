import { getRandomSpecialty, specialties } from "@/config/catalog";
import prisma from "@/config/database";
import { hasIncompleteFields } from "@/utils";
import { User } from "@prisma/client";
import { UserArgs } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";



export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { id: "desc" },
        });

        return NextResponse.json({
            message: "Users found",
            users
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        
    }
}

export async function POST(request: NextRequest) {
    try {
        const { email, phoneNumber, name, specialty, password } = await request.json() as User;

        // Example JSON body to send in a POST request
        const exampleJsonBody = {
            email: "example@example.com",
            phoneNumber: "123-456-7890",
            name: "John Doe",
            specialty: "Cardiology",
            password: "password123"
        };
        

        if(hasIncompleteFields({ email, name, password })) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        
        const user = await prisma.user.create({
            data: {
                email,
                phoneNumber,
                name,
                specialty: specialty || getRandomSpecialty().nombre,
                password
            }
        });


        return NextResponse.json({
            message: "User created",
            user
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        
    }
}

export async function DELETE(request: NextRequest) {
    try {

        const deletedUsers = await prisma.user.deleteMany();

        return NextResponse.json({
            message: "Users deleted",
            deletedUsers
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        
    }
}