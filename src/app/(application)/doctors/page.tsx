'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
    // TableRow,
} from '@/components/tablebitch';
import { Input } from '@/components/input';
import {
    MdNavigateNext,
    MdNavigateBefore,
} from 'react-icons/md';

import AppHeader from "@/components/app/appHeader"

const ITEMS_PER_PAGE = 10;

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    email: string;
    phoneNumber: string;
}

const initialData: Doctor[] = [
    // ... más datos
];

export default function page() {
    const [data, setData] = useState<Doctor[]>(initialData);
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

        const response = await fetch("/api/doctors", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()) as any

        setData(response.doctors)

        console.log({
            "doctors": response.doctors
        })

    }
    

    useEffect(() => {
        getData()
    }, [])
    
    
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
                                <TableCell>{doctor.phoneNumber}</TableCell>
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