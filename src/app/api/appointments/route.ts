import prisma from "@/config/database";
import { hasIncompleteFields } from "@/utils";
import { Appointment } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {

        const appointments = await prisma.appointment.findMany({
            orderBy: { id: "desc" },
            include: {
                User: true,
                Patient: true,
                Machine: {
                    include: {
                        Room: true
                    }
                }
            }
        });

        console.log(appointments);
        

        return NextResponse.json({
            code: 200,
            message: "Appointments found",
            appointments: (appointments.map(appointment => {
                return {
                    ...appointment,
                    patientName: appointment.Patient.firstName,
                    machineName: appointment.Machine.machineName,
                    roomName: appointment.Machine.Room.roomName,
                    formattedDay: new Date(appointment.Date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
                    formattedTime: new Date(appointment.Date).toLocaleTimeString('es-ES', { hour: 'numeric', minute: 'numeric' })
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

        const { patientId, userId, reason, machineId, Date } = await request.json() as Appointment;

        console.log(patientId, userId, reason, machineId, Date);
        

        if(hasIncompleteFields({ patientId, userId, reason, machineId, Date })) {
            return NextResponse.json({ message: "Missing fields", code: 401 }, { status: 400 });
        }

        const newAppointment = await prisma.appointment.create({
            data: {
                patientId,
                userId,
                reason,
                machineId,
                Date
            }
        });

        return NextResponse.json({
            code: 200,
            message: "Appointment created",
            newAppointment
        });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
    
}

export async function DELETE(request:NextRequest) {
    try {

        const deletedAppointments = await prisma.appointment.deleteMany();

        return NextResponse.json({
            message: "Appointments deleted",
            deletedAppointments
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        
    }
}