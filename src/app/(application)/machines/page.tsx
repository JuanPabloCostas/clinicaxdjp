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
} from '@/components/tablebitch';
import { Input } from '@/components/input';
import {
    MdNavigateNext,
    MdNavigateBefore,
} from 'react-icons/md';

import AppHeader from "@/components/app/appHeader"

const ITEMS_PER_PAGE = 10;
const initialData = [
    { id: "M001", location: "ICU", model: "Model 1", brand: "Brand 1", status: "Operational"},
    { id: "M002", location: "ER", model: "Model 2", brand: "Brand 2", status: "Maintenance"},
    { id: "M003", location: "OR", model: "Model 3", brand: "Brand 3", status: "Desactivated"},
    { id: "M004", location: "ICU", model: "Model 4", brand: "Brand 4", status: "Operational"},
    { id: "M005", location: "ER", model: "Model 5", brand: "Brand 5", status: "Maintenance"},
    { id: "M006", location: "OR", model: "Model 6", brand: "Brand 6", status: "Desactivated"},
    { id: "M007", location: "ICU", model: "Model 7", brand: "Brand 7", status: "Operational"},
    { id: "M008", location: "ER", model: "Model 8", brand: "Brand 8", status: "Maintenance"},
    { id: "M009", location: "OR", model: "Model 9", brand: "Brand 9", status: "Desactivated"},
    { id: "M010", location: "ICU", model: "Model 10", brand: "Brand 10", status: "Operational"},
    { id: "M011", location: "ER", model: "Model 11", brand: "Brand 11", status: "Maintenance"},
    { id: "M012", location: "OR", model: "Model 12", brand: "Brand 12", status: "Desactivated"},
    // ... más datos
];

export default function page() {
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
                                    Machine ID
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
                                    Location
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
                                    Model
                                    {sortConfig.key === "model" && (
                                        <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </div>
                            </TableHeaderCell>
                            <TableHeaderCell
                                className='cursor-pointer hover:bg-gray-100'
                                onClick={() => handleSort("brand")}
                            >
                                <div className="flex items-center gap-2 select-none">
                                    Brand
                                    {sortConfig.key === "brand" && (
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
                                <TableCell>{machine.id}</TableCell>
                                <TableCell>{machine.location}</TableCell>
                                <TableCell>{machine.model}</TableCell>
                                <TableCell>{machine.brand}</TableCell>
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