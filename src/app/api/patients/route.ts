import prisma from "@/config/database";
import { hasIncompleteFields } from "@/utils";
import { Patient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const calculateAge = (dateOfBirth: Date) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


export async function GET(request: NextRequest) {
    try {
        let patients = await prisma.patient.findMany({
            orderBy: { id: "desc" },
        });


        return NextResponse.json({
            code: 200,
            message: "Patients found",
            patients: patients.map(patient => {
                return {
                    ...patient,
                    age: (patient.dateOfBirth) ? calculateAge(patient.dateOfBirth) : undefined
                }
            })
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
    
}


export async function POST(request: NextRequest) {
    try {

        const { firstName, lastName, dateOfBirth, gender, phoneNumber, email, curp, address, emergencyContactName, emergencyContactPhone } = await request.json() as Patient;

        if (hasIncompleteFields({ firstName, lastName, dateOfBirth, gender, phoneNumber, email, curp, address, emergencyContactName, emergencyContactPhone })) {
            return NextResponse.json({ message: "Missing fields", code: 401 }, { status: 401 });
        }

        const existingPatient = await prisma.patient.findUnique({
            where: {
                email
            }
        });

        if(existingPatient) {
            console.log(existingPatient);
            return NextResponse.json({ message: "Patient already exists" }, { status: 400 });
        }

        const patient = await prisma.patient.create({
            data: {
                firstName,
                lastName,
                dateOfBirth,
                gender,
                phoneNumber,
                email,
                curp,
                address,
                emergencyContactName,
                emergencyContactPhone
            }
        });
        
        return NextResponse.json({
            code: 200,
            message: "Patient created",
            patient
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
    
}

export async function DELETE(request: NextRequest) {
    try {

        const deletedPatients = await prisma.patient.deleteMany();        

        return NextResponse.json({
            message: "Patients deleted",
            deletedPatients
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        
    }    
}