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

import { AddPatientFlow } from "../types";
import AppHeader from '../app/appHeader';

interface PatientDashboardProps {
    setState: (state: AddPatientFlow) => void;
}

interface Patient {
    id: string;
    firstName: string;
    age?: number;
    email: string;
    phoneNumber?: string;
}

const ITEMS_PER_PAGE = 10;

// Datos de ejemplo
const initialData: Patient[] = [
    // ... más datos
];

export const PatientDashboard = ({ setState }: PatientDashboardProps) => {
    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    // Función para ordenar
    const handleSort = (key : string) => {
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
                item.firstName.toLowerCase().includes(searchTerm.toLowerCase())
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

    const getData = async () => {
        
        const response = await fetch('/api/patients').then(res => res.json()) as any;

        if (response.code === 200) {

            console.log(response.patients);
            
            setData(response.patients as Patient[])
        }
        
    }

    useEffect(() => {
        getData()
    }, [])
    

    return (
        <div className="w-full space-y-4">
            <AppHeader metadata={{ title: "Patient Management" }} />
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
                    Add Patient
                </Button>
            </div>

            <TableRoot>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('name')}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Patient Name
                                    {sortConfig.key === 'name' && (
                                        <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('age')}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Age
                                    {sortConfig.key === 'age' && (
                                        <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('condition')}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Email
                                    {sortConfig.key === 'condition' && (
                                        <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('nextAppointment')}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Phone Number
                                    {sortConfig.key === 'nextAppointment' && (
                                        <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((patient, index) => (
                            <TableRow key={index}>
                                <TableCell>{patient.firstName}</TableCell>
                                <TableCell>{patient.age || "-"}</TableCell>
                                <TableCell>{patient.email}</TableCell>
                                <TableCell>{patient.phoneNumber || "-"}</TableCell>
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

export default PatientDashboard;