import React, { useState, useMemo, useEffect } from 'react';
import { Button } from "../button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from "../tablebitch";
import { Input } from '../input';
import {
    MdAdd,
    MdNavigateNext,
    MdNavigateBefore,
 } from 'react-icons/md'; 

import { AddAppointmentFlow } from "../types";
import AppHeader from '../app/appHeader';

interface AppointmentsDashboardProps {
    setState: (state: AddAppointmentFlow) => void;
}

const ITEMS_PER_PAGE = 10;

interface Appointment {
    id: string;
    patientName: string;
    machineName: string;
    roomName: string;
    formattedDay: string;
    formattedTime: string;
    reason: string;
}

const initialData: Appointment[] = [
    // ... datos
    {id: "1", patientName: "Juan Pablo", machineName: "CamaDentisa1", roomName: "Dentista", formattedDay: "4 de enero de 2025", formattedTime: "0:00", reason: "Consulta"},
    {id: "2", patientName: "Juan Pablo", machineName: "CamaDentisa1", roomName: "Dentista", formattedDay: "4 de enero de 2025", formattedTime: "0:00", reason: "Consulta"},
    {id: "3", patientName: "Juan Pablo", machineName: "CamaDentisa1", roomName: "Dentista", formattedDay: "4 de enero de 2025", formattedTime: "0:00", reason: "Consulta"},
    {id: "4", patientName: "Juan Pablo", machineName: "CamaDentisa1", roomName: "Dentista", formattedDay: "4 de enero de 2025", formattedTime: "0:00", reason: "Consulta"},
    
    // ... más datos
];



export const AppointmentsDashboard = ({ setState }: AppointmentsDashboardProps) => {
    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    // Función para ordenar
    const handleSort = (key: string) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getAppointments = async () => {
        const response = await fetch("/api/appointments");
        const data = await response.json();
        setData(data.appointments);
    }

    // Datos filtrados y ordenados
    const filteredAndSortedData = useMemo(() => {
        let processedData = [...data];
        
        // Filtrar por búsqueda
        if (searchTerm) {
            processedData = processedData.filter(item =>
                item.patientName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Ordenar
        if (sortConfig.key) {
            processedData.sort((a: any, b: any) => {
                if (sortConfig.key !== null) {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                }
                return 0;
            });
        }

        return processedData;
    }, [data, searchTerm, sortConfig]);

    // Paginación
    const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
    const currentData = filteredAndSortedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
      getAppointments();
    
      
    }, [])
    

    return (
        <div className="w-full space-y-4">
            <AppHeader metadata={{title: "Appointment Management"}} />
            <div className="flex justify-between items-center mb-4">
                <Input
                    className='w-1/3'
                    placeholder="Search by patient name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type='search'
                />
                <Button 
                    variant="green"
                    onClick={() => setState("registration")}
                    icon={<MdAdd size={18} />}
                >
                    Add Appointment
                </Button>
            </div>

            <TableRoot>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('patient')}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Patient
                                    {sortConfig.key === 'patient' && (
                                        <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('date')}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Machine
                                    {sortConfig.key === 'date' && (
                                        <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('time')}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Room
                                    {sortConfig.key === 'time' && (
                                        <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('doctor')}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Day
                                    {sortConfig.key === 'doctor' && (
                                        <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('status')}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Hour
                                    {sortConfig.key === 'status' && (
                                        <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('status')}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Comments
                                    {sortConfig.key === 'status' && (
                                        <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((appointment, index) => (
                            <TableRow key={index}>
                                <TableCell>{appointment.patientName}</TableCell>
                                <TableCell>{appointment.machineName}</TableCell>
                                <TableCell>{appointment.roomName}</TableCell>
                                <TableCell>{appointment.formattedDay}</TableCell>
                                <TableCell>{appointment.formattedTime}</TableCell>
                                <TableCell>{appointment.reason}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableRoot>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 pb-4">
                    <Button
                        variant="secondary"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        icon={<MdNavigateBefore size={18} />}
                    >
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i + 1}
                            variant={currentPage === i + 1 ? "green" : "secondary"}
                            onClick={() => setCurrentPage(i + 1)}
                            className='w-9'
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        variant="secondary"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        icon={<MdNavigateNext size={18} />}
                    />
                </div>
            )}
        </div>
    );
};

export default AppointmentsDashboard;