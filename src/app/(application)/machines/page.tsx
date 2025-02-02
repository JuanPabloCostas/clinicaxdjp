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
} from '@/components/tablebitch';
import { Input } from '@/components/input';
import {
    MdNavigateNext,
    MdNavigateBefore,
    MdAdd,
} from 'react-icons/md';

import AppHeader from "@/components/app/appHeader"
import { useRouter } from 'next/navigation';

interface Machine {
    id: string;
    machineName: string;
    type: string;
    roomName: string;
    status: "Operational" | "Maintenance" | "Desactivated" | string;
}

const ITEMS_PER_PAGE = 10;
const initialData: Machine[] = [
    // ... datos
    
    // ... más datos
];

export default function page() {
    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    const router = useRouter();

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
                item.id.toLowerCase().includes(searchTerm.toLowerCase())
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

    const getMachines = async () => {
        const response = await fetch("/api/machines");
        const data = await response.json();
        setData(data.machines);
    };

    useEffect(() => {
      
      getMachines();
      
    }, [])
    
    
    return (
        <div className="w-full space-y-4">
            <AppHeader metadata={{title: "Machine Administration"}} />
            <div className="flex justify-between items-center mb-4">
                <Input
                    className='w-1/3'
                    placeholder="Search by ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type='search'
                />
                <Button 
                    variant="green"
                    onClick={() => {router.push("/machines/add")}}
                    icon={<MdAdd size={18} />}
                >
                    Add Machine
                </Button>
            </div>
            <TableRoot>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell
                                className='cursor-pointer hover:bg-gray-100'
                                onClick={() => handleSort("Machine ID")}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Machine Name
                                    {sortConfig.key === "Machine ID" && (
                                        <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell
                                className='cursor-pointer hover:bg-gray-100'
                                onClick={() => handleSort("location")}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Type
                                    {sortConfig.key === "location" && (
                                        <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell
                                className='cursor-pointer hover:bg-gray-100'
                                onClick={() => handleSort("model")}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Room
                                    {sortConfig.key === "model" && (
                                        <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            
                            <TableHeaderCell
                                className='cursor-pointer hover:bg-gray-100'
                                onClick={() => handleSort("status")}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Status
                                    {sortConfig.key === "status" && (
                                        <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((machine, index) => (
                            <TableRow key={index}>
                                <TableCell>{machine.machineName}</TableCell>
                                <TableCell>{machine.type}</TableCell>
                                <TableCell>{machine.roomName}</TableCell>
                                <TableCell>
                                    <div className='w-fit p-1 px-2 flex items-center gap-2 bg-[#31723417] rounded-lg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                            <circle cx="3" cy="3" r="3" fill={machine.status === "Operational" ? "#098833" : machine.status === "Maintenance" ? "orange" : "red"}/>
                                        </svg>
                                        {machine.status}
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