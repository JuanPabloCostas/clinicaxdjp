"use client"

import { useState } from 'react';
import { Input } from '../input';
import { Label } from '../label';
import { Button } from '../button';
import { DatePickerBirthDateExample } from '../dateBirthDatePicker';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../select";

import { AddPatientFlow } from "../types";
import { DatePicker } from '../datePicker';

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



interface PatientRegistrationFormProps {
    setState: (state: AddPatientFlow) => void;
}

interface Patient {
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    gender: string;
    phoneNumber: string;
    email: string; // Unique
    curp: string; // Unique
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  }

export const PatientRegistrationForm = ({ setState }: PatientRegistrationFormProps) => {

    const [loading, setloading] = useState(false)

    const [patientData, setpatientData] = useState<Patient>({
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(),
        gender: '',
        phoneNumber: '',
        email: '', // Unique
        curp: '', // Unique
        address: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
    })

    const successToast = () => {
        toast.success("Creacion exitosa");
    }

    const missingToast = () => {
        toast.error("Faltan campos");
    }

    const errorToast = () => {
        toast.error("Usuario ya existe", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }


    const handleSubmit = async(e: any) => {
        e.preventDefault()

        setloading(true)

        const reqBody = {
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            dateOfBirth: patientData.dateOfBirth,
            gender: patientData.gender,
            phoneNumber: patientData.phoneNumber,
            email: patientData.email, // Unique
            curp: patientData.curp, // Unique
            address: patientData.address,
            emergencyContactName: patientData.emergencyContactName,
            emergencyContactPhone: patientData.emergencyContactPhone,
        }

        const response = await fetch("/api/patients", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()) as any

        console.log(response);
        

        if ( response.code === 200 ) {
            successToast()

            await new Promise(resolve => setTimeout(resolve, 700));

            setState("dashboard")

        } else {
            if (response.code === 401) {
                missingToast()
            }
            else errorToast()
        }

        setloading(false)


    }

    return (
        <form action="#" method='post' className="flex flex-col py-1 mx-auto w-3/5 gap-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Register New Patient</h1>
            <div className='grid grid-cols-2 gap-4'>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="first-name">First Name</Label>
                    <Input id="first-name" type="text" placeholder='Enter first name' onChange={(e) => setpatientData({ ...patientData, firstName: e.target.value })} />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" type="text" placeholder='Enter last name' onChange={(e) => setpatientData({ ...patientData, lastName: e.target.value })} />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="birth">Date of Birth</Label>
                    {/* <DatePickerBirthDateExample  /> */}
                    <DatePicker
                        enableYearNavigation
                        onChange={(e) => setpatientData({ ...patientData, dateOfBirth: e })}
                        className="w-60"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="gender">Gender</Label>
                    <Select onValueChange={(e) => setpatientData({ ...patientData, gender: e })}>
                        <SelectTrigger id='gender'>
                            <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="masculine">Masculine</SelectItem>
                            <SelectItem value="feminine">Feminine</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="none">I prefer not to say</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="phonw">Phone Number</Label>
                    <Input id="phone" type="text" placeholder='Enter phone number' onChange={(e) => setpatientData({ ...patientData, phoneNumber: e.target.value })} />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder='Enter email' onChange={(e) => setpatientData({ ...patientData, email: e.target.value })} />
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <Label className='font-semibold' htmlFor="curp">CURP</Label>
                <Input id="curp" type="text" placeholder='Enter CURP' onChange={(e) => setpatientData({ ...patientData, curp: e.target.value })} />
            </div>
            <div className='flex flex-col gap-3'>
                <Label className='font-semibold' htmlFor="address">Address</Label>
                <Input id="address" type="text" placeholder='Enter address' onChange={(e) => setpatientData({ ...patientData, address: e.target.value })} />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="emergency-name">Emergency Contact Name</Label>
                    <Input id="emergency-name" type="text" placeholder='Enter emergency contact name' onChange={(e) => setpatientData({ ...patientData, emergencyContactName: e.target.value })} />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="emergency-phone">Emergency Contact Phone</Label>
                    <Input id="emergency-phone" type="text" placeholder='Enter emergency contact phone' onChange={(e) => setpatientData({ ...patientData, emergencyContactPhone: e.target.value })} />
                </div>
            </div>
            <div className='w-full flex flex-row justify-between'>
                <Button type="button" variant="destructive" onClick={() => setState('dashboard')}>Cancel</Button>
                <Button type="submit" variant="green" onClickCapture={handleSubmit} disabled={loading}>Register</Button>
            </div>
        </form>
    )
}