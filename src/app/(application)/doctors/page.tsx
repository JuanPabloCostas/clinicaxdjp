'use client'

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from '@/components/table';
import { Input } from '@/components/input';
import {
    MdAdd,
    MdNavigateNext,
    MdNavigateBefore,
} from 'react-icons/md';

import AppHeader from "@/components/app/appHeader"

const ITEMS_PER_PAGE = 10;
const initialData = [
    { name: "John Doe", specialty: "Cardiology", email: "johndoe@example.com", phone: "555-1234" },
    { name: "Jane Smith", specialty: "Dermatology", email: "janesmith@example.com", phone: "555-5678" },
    { name: "Alice Johnson", specialty: "Endocrinology", email: "alicejohnson@example.com", phone: "555-9012" },
    { name: "Bob Brown", specialty: "Gastroenterology", email: "bobbrown@example.com", phone: "555-3456" },
    { name: "Eve White", specialty: "Hematology", email: "evewhite@example.com", phone: "555-7890" },
    { name: "Charlie Black", specialty: "Infectious Disease", email: "charlieblack@example.com", phone: "555-2345" },
    { name: "Grace Green", specialty: "Nephrology", email: "gracegreen@example.com", phone: "555-6789" },
    { name: "Harry Blue", specialty: "Neurology", email: "harryblue@example.com", phone: "555-0123" },
    { name: "Ivy Brown", specialty: "Oncology", email: "ivybrown@example.com", phone: "555-4567" },
    { name: "Jack White", specialty: "Pulmonology", email: "jackwhite@example.com", phone: "555-8901" },
    { name: "Kelly Green", specialty: "Rheumatology", email: "kellygreen@example.com", phone: "555-2345" },
    { name: "Liam Black", specialty: "Urology", email: "liamblack@example.com", phone: "555-6789" },
    // ... más datos
];

export default function page() {
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
            <AppHeader metadata={{title: "Doctor Management"}} />
            <div className="flex justify-between items-center mb-4">
                <Input
                    className='w-1/3'
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type='search'
                />
            </div>
            <TableRoot>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell
                                className='cursor-pointer hover:bg-gray-100'
                                onClick={() => handleSort("name")}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Doctor Name
                                    {sortConfig.key === "name" && (
                                        <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell
                                className='cursor-pointer hover:bg-gray-100'
                                onClick={() => handleSort("specialty")}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Specialty
                                    {sortConfig.key === "specialty" && (
                                        <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell
                                className='cursor-pointer hover:bg-gray-100'
                                onClick={() => handleSort("email")}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Email
                                    {sortConfig.key === "email" && (
                                        <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell
                                className='cursor-pointer hover:bg-gray-100'
                                onClick={() => handleSort("phone")}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Phone
                                    {sortConfig.key === "phone" && (
                                        <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((doctor, index) => (
                            <TableRow key={index}>
                                <TableCell>{doctor.name}</TableCell>
                                <TableCell>{doctor.specialty}</TableCell>
                                <TableCell>{doctor.email}</TableCell>
                                <TableCell>{doctor.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableRoot>
            
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 pb-4">
                    <Button
                        variant='secondary'
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        icon={<MdNavigateBefore size={18} />}
                    />
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i + 1}
                            variant={currentPage === i + 1 ? 'green' : 'secondary'}
                            onClick={() => setCurrentPage(i + 1)}
                            className='w-9'
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        variant='secondary'
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        icon={<MdNavigateNext size={18} />}
                    />
                </div>
            )}
        </div>
    );
}