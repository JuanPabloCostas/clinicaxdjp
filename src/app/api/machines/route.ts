import prisma from "@/config/database";
import { hasIncompleteFields } from "@/utils";
import { Machine } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {

        const machines = await prisma.machine.findMany({
            orderBy: { id: "desc" },
            include: {
                Room: true
            }
        });

        return NextResponse.json({
            code: 200,
            message: "Machines found",
            machines: (machines.map(machine => {
                return {
                    ...machine,
                    roomName: machine.Room.roomName
                }
            }))
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }


}

export async function POST(request:NextRequest) {
    try {

        const { machineName, status, type, roomId } = await request.json() as Machine;

        if(hasIncompleteFields({ machineName, status, type, roomId })) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const existingMachine = await prisma.machine.findUnique({
            where: {
                machineName
            }
        });

        if(existingMachine) {
            console.log(existingMachine);
            return NextResponse.json({ message: "Machine already exists" }, { status: 400 });
        }

        const machine = await prisma.machine.create({
            data: {
                machineName,
                status,
                type,
                roomId
            }
        });

        return NextResponse.json({
            code: 200,
            message: "Machine created",
            machine
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
    
}

export async function DELETE(request:NextRequest) {
    try {

        const deletedMachines = await prisma.machine.deleteMany();

        return NextResponse.json({
            message: "Machines deleted",
            deletedMachines
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        
    }
}