import React, { useState, useMemo } from 'react';
import { Button } from "../button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from "../table";
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

const initialData = [
    { patient: "John Doe", date: "2023-10-01", time: "10:00 AM", doctor: "Dr. Smith", status: "Confirmed" },
    { patient: "Jane Smith", date: "2023-10-02", time: "11:00 AM", doctor: "Dr. Johnson", status: "Pending" },
    { patient: "Alice Johnson", date: "2023-10-03", time: "12:00 PM", doctor: "Dr. White", status: "Canceled" },
    { patient: "Bob Brown", date: "2023-10-04", time: "01:00 PM", doctor: "Dr. Black", status: "Pending" },
    { patient: "Eve White", date: "2023-10-05", time: "02:00 PM", doctor: "Dr. Green", status: "Confirmed" },
    { patient: "Charlie Black", date: "2023-10-06", time: "03:00 PM", doctor: "Dr. Blue", status: "Canceled" },
    { patient: "Grace Green", date: "2023-10-07", time: "04:00 PM", doctor: "Dr. Brown", status: "Confirmed" },
    { patient: "Harry Blue", date: "2023-10-08", time: "05:00 PM", doctor: "Dr. Green", status: "Pending" },
    { patient: "Ivy Brown", date: "2023-10-09", time: "06:00 PM", doctor: "Dr. White", status: "Confirmed" },
    { patient: "Jack White", date: "2023-10-10", time: "07:00 PM", doctor: "Dr. Johnson", status: "Pending" },
    { patient: "Kelly Green", date: "2023-10-11", time: "08:00 PM", doctor: "Dr. Smith", status: "Confirmed" },
    { patient: "Liam Black", date: "2023-10-12", time: "09:00 PM", doctor: "Dr. Brown", status: "Canceled" },
    // ... más datos
];

export const AppointmentsDashboard = ({ setState }: AppointmentsDashboardProps) => {
    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Función para ordenar
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Datos filtrados y ordenados
    const filteredAndSortedData = useMemo(() => {
        let processedData = [...data];
        
        // Filtrar por búsqueda
        if (searchTerm) {
            processedData = processedData.filter(item =>
                item.patient.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Ordenar
        if (sortConfig.key) {
            processedData.sort((a, b) => {
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

    return (
        <div className="w-full space-y-4">
            <AppHeader metadata={{title: "Appointments"}} />
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
                                    Date
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
                                    Time
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
                                    Doctor
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
                                    Status
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
                                <TableCell>{appointment.patient}</TableCell>
                                <TableCell>{appointment.date}</TableCell>
                                <TableCell>{appointment.time}</TableCell>
                                <TableCell>{appointment.doctor}</TableCell>
                                <TableCell>
                                    <div className='w-fit p-1 px-2 flex items-center gap-2 bg-[#31723417] rounded-lg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                            <circle cx="3" cy="3" r="3" fill={appointment.status === "Confirmed" ? "#098833" : appointment.status === "Pending" ? "orange" : "red"}/>
                                        </svg>
                                        {appointment.status}
                                    </div>
                                </TableCell>
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