"use client";

import { useState, useEffect, use } from 'react';
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
import { set } from 'date-fns';

interface Machine {
    machineName: string;
    type: string;
    roomId: string;
    status: "Operational" | "Maintenance" | "Desactivated" | string;
}

interface Room {
    id: string;
    roomName: string;
    size: string;
    status: "Operational" | "Maintenance" | "Closed" ;
}

export default function page() {

    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para los pacientes filtrados
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
    // Estado para el paciente seleccionado
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    // Estado para mostrar/ocultar el dropdown
    const [isSearching, setIsSearching] = useState(false);

    // const rooms: Room[] = [
    //     { id: '1', roomName: 'Room 1', size: 'Small', status: "Operational" },
    //     { id: '2', roomName: 'Room 2', size: 'Medium', status: "Operational" },
    //     // ... más pacientes
    // ];

    const [rooms, setrooms] = useState<Room[]>([])

    // Efecto para filtrar pacientes basado en el término de búsqueda
    useEffect(() => {
        if (searchTerm) {
            const filtered = rooms.filter(room =>
                room.roomName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRooms(filtered);
            setIsSearching(true);
        } else {
            setFilteredRooms([]);
            setIsSearching(false);
        }
    }, [searchTerm]);

    const handleRoomSelect = (room: Room) => {
        setSelectedRoom(room);
        setSearchTerm(room.roomName);
        setIsSearching(false);
    }

    const [loading, setloading] = useState(false)

    const router = useRouter();

    const [machineData, setmachineData] = useState<Machine>({
        machineName: "",
        type: "",
        roomId: "",
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

    const getRooms = async () => {
        const response = await fetch("/api/rooms", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json());

        
        setrooms(response.rooms)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setloading(true)

        const reqBody = {
            machineName: machineData.machineName,
            type: machineData.type,
            roomId: selectedRoom?.id,
            status: machineData.status
        };

        const response = await fetch("/api/machines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        }).then(res => res.json());

        if (response.code === 200) {
            successToast()
            await new Promise(resolve => setTimeout(resolve, 500));
            router.push("/machines")
        } else if (response.code === 401) {
            missingToast()
        } else {
            errorToast()
        }

        setloading(false)

    }

    useEffect(() => {
        getRooms()
    }, [])

    return (
        <form action="#" method='post' className="flex flex-col py-1 mx-auto w-3/5 gap-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Register New Room</h1>
            <div className='flex flex-col gap-4'>

            <div className="flex flex-col gap-3 relative">
                    <Label className='font-semibold' htmlFor="room-search">Room</Label>
                    <div className="relative">
                        <Input
                            id="room-search"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search room..."
                            className="pr-10"
                        />
                        <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    
                    {/* Dropdown de resultados de búsqueda */}
                    {isSearching && (
                        <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg mt-1 z-50">
                            {filteredRooms.length > 0 ? (
                                <div className="max-h-60 overflow-y-auto">
                                    {filteredRooms.map((room) => (
                                        <div
                                            key={room.id}
                                            className="p-3 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleRoomSelect(room)}
                                        >
                                            <div className="font-medium">{room.roomName}</div>
                                            <div className="text-sm text-gray-500">{room.status}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4">
                                    <p className="text-gray-500 mb-2">No rooms found</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="machinename">Machine Name</Label>
                    <Input id="machinename" type="text" placeholder='Enter machine name' onChange={(e) => setmachineData({ ...machineData, machineName: e.target.value })} />
                </div>

                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="type">Type</Label>
                    <Input id="type" type="text" placeholder='Enter machine type' onChange={(e) => setmachineData({ ...machineData, type: e.target.value })} />
                </div>

                {/* Resto de los campos del formulario */}
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="state">Inital State</Label>
                    <Select onValueChange={(e) => setmachineData({ ...machineData, status: e })}>
                        <SelectTrigger id='state'>
                            <SelectValue placeholder="Select an initial state" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Operational">Operational</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                            <SelectItem value="Desactivated">Desactivated</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='w-full flex flex-row justify-between'>
                <Button type="button" variant="destructive" onClickCapture={() => { router.push("/machines") }}>Cancel</Button>
                <Button type="submit" variant="green" onClickCapture={handleSubmit} disabled={loading}>Register</Button>
            </div>
        </form>
    )
}