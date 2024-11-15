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

import { AddPatientFlow } from "./types";

interface PatientRegistrationFormProps {
    setState: (state: AddPatientFlow) => void;
}

export const PatientRegistrationForm = ({ setState }: PatientRegistrationFormProps) => {
    return (
        <form action="#" method='post' className="flex flex-col py-1 mx-auto w-3/5 gap-4">
            <h1 className="text-2xl font-bold mb-4">Register New Patient</h1>
            <div className='grid grid-cols-2 gap-4'>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="first-name">First Name</Label>
                    <Input id="first-name" type="text" placeholder='Enter first name' />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" type="text" placeholder='Enter last name' />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="birth">Date of Birth</Label>
                    <DatePickerBirthDateExample />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="gender">Gender</Label>
                    <Select>
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
                    <Input id="phone" type="text" placeholder='Enter phone number' />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder='Enter email' />
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <Label className='font-semibold' htmlFor="curp">CURP</Label>
                <Input id="curp" type="text" placeholder='Enter CURP' />
            </div>
            <div className='flex flex-col gap-3'>
                <Label className='font-semibold' htmlFor="address">Address</Label>
                <Input id="address" type="text" placeholder='Enter address' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="emergency-name">Emergency Contact Name</Label>
                    <Input id="emergency-name" type="text" placeholder='Enter emergency contact name' />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="emergency-phone">Emergency Contact Phone</Label>
                    <Input id="emergency-phone" type="text" placeholder='Enter emergency contact phone' />
                </div>
            </div>
            <div className='w-full flex flex-row justify-between'>
                <Button type="button" variant="destructive" onClick={() => setState('dashboard')}>Cancel</Button>
                <Button type="submit" variant="green">Register</Button>
            </div>
        </form>
    )
}