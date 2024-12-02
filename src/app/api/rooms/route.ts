import prisma from "@/config/database";
import { hasIncompleteFields } from "@/utils";
import { Room } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {

        const rooms = await prisma.room.findMany({
            orderBy: { id: "desc" },
        });

        return NextResponse.json({
            message: "Rooms found",
            rooms
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 }); 
    }
}

export async function POST(request: NextRequest) {
    try {

        const { roomName, size, status } = await request.json() as Room;

        if(hasIncompleteFields({ roomName, size, status })) {
            return NextResponse.json({ message: "Missing fields", code: 401 }, { status: 400 });
        }

        const existingRoom = await prisma.room.findUnique({
            where: {
                roomName
            }
        });

        if(existingRoom) {
            console.log(existingRoom);
            return NextResponse.json({ message: "Room already exists" }, { status: 400 });
        }

        const room = await prisma.room.create({
            data: {
                roomName,
                size,
                status
            }
        });


        return NextResponse.json({
            code: 200,
            message: "Room created",
            room
        })


        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {

        const deletedRooms = await prisma.room.deleteMany();

        return NextResponse.json({
            message: "Rooms deleted",
            deletedRooms
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        
    }
}