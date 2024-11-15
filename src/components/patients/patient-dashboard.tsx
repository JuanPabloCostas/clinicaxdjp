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

import { AddPatientFlow } from "./types";

interface PatientDashboardProps {
    setState: (state: AddPatientFlow) => void;
}

const ITEMS_PER_PAGE = 10;

// Datos de ejemplo
const initialData = [
    { name: "John Doe", age: 45, condition: "Diabetes", nextAppointment: "2023-10-01" },
    { name: "Jane Smith", age: 34, condition: "Hypertension", nextAppointment: "2023-10-02" },
    { name: "Alice Johnson", age: 28, condition: "Asthma", nextAppointment: "2023-10-03" },
    { name: "Bob Brown", age: 52, condition: "Obesity", nextAppointment: "2023-10-04" },
    { name: "Eve White", age: 41, condition: "Arthritis", nextAppointment: "2023-10-05" },
    { name: "Charlie Black", age: 39, condition: "Depression", nextAppointment: "2023-10-06" },
    { name: "Grace Green", age: 31, condition: "Migraine", nextAppointment: "2023-10-07" },
    { name: "Harry Blue", age: 49, condition: "Cancer", nextAppointment: "2023-10-08" },
    { name: "Ivy Brown", age: 56, condition: "Alzheimer's", nextAppointment: "2023-10-09" },
    { name: "Jack White", age: 37, condition: "Epilepsy", nextAppointment: "2023-10-10" },
    { name: "Kelly Green", age: 43, condition: "Parkinson's", nextAppointment: "2023-10-11" },
    { name: "Liam Black", age: 47, condition: "HIV/AIDS", nextAppointment: "2023-10-12" },
    // ... más datos
];

export const PatientDashboard = ({ setState }: PatientDashboardProps) => {
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
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                                    Condition
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
                                    Next Appointment
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
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>{patient.age}</TableCell>
                                <TableCell>{patient.condition}</TableCell>
                                <TableCell>{patient.nextAppointment}</TableCell>
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