"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Button } from '@/components/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/select";
import { MdSearch } from 'react-icons/md';
import { AddAppointmentFlow } from '@/components/types';
import { DatePicker } from '@/components/datePicker';

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

interface Room {
    roomName: string;
    size: string;
    status: "Operational" | "Maintenance" | "Closed";
}

export default function page() {

    const [loading, setloading] = useState(false)

    const router = useRouter();

    const [roomData, setroomData] = useState({
        roomName: "",
        size: "",
        status: "Operational"
    })

    const successToast = () => {
        toast.success("Creacion exitosa");
    }

    const missingToast = () => {
        toast.error("Faltan campos");
    }

    const errorToast = () => {
        toast.error("Cuarto ya existe", {
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

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setloading(true)

        const reqBody = {
            roomName: roomData.roomName,
            size: roomData.size,
            status: roomData.status
        };

        const response = await fetch("/api/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        }).then(res => res.json());

        if (response.code === 200) {
            successToast()
            await new Promise(resolve => setTimeout(resolve, 500));
            router.push("/rooms")
        } else if (response.code === 401) {
            missingToast()
        } else {
            errorToast()
        }

        setloading(false)

    }

    return (
        <form action="#" method='post' className="flex flex-col py-1 mx-auto w-3/5 gap-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Register New Room</h1>
            <div className='flex flex-col gap-4'>

                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="roomname">Room Name</Label>
                    <Input id="roomname" type="text" placeholder='Enter room name' onChange={(e) => setroomData({ ...roomData, roomName: e.target.value })} />
                </div>

                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="size">Room Size</Label>
                    <Input id="size" type="text" placeholder='Enter room size' onChange={(e) => setroomData({ ...roomData, size: e.target.value })} />
                </div>

                {/* Resto de los campos del formulario */}
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="state">Inital State</Label>
                    <Select onValueChange={(e) => setroomData({ ...roomData, status: e })}>
                        <SelectTrigger id='state'>
                            <SelectValue placeholder="Select an initial state" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Operational">Operational</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='w-full flex flex-row justify-between'>
                <Button type="button" variant="destructive" onClickCapture={() => { router.push("/rooms") }}>Cancel</Button>
                <Button type="submit" variant="green" onClickCapture={handleSubmit} disabled={loading}>Register</Button>
            </div>
        </form>
    )
}