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

const ITEMS_PER_PAGE = 10;

// Datos de ejemplo
const initialData = [
    { name: "John Doe", age: 45, condition: "Diabetes", nextAppointment: "2023-10-01" },
    { name: "Jane Smith", age: 34, condition: "Hypertension", nextAppointment: "2023-10-02" },
    // ... más datos
];

export const PatientTable = ({ setState }) => {
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
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
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
                <div className="flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Search by patient name..."
                        className="p-2 border rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button 
                        variant="primary"
                        onClick={() => setState("registration")}
                    >
                        Add Patient
                    </Button>
                </div>
            </div>

            <TableRoot>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('name')}
                            >
                                <div className="flex items-center gap-2">
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
                                <div className="flex items-center gap-2">
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
                                <div className="flex items-center gap-2">
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
                                <div className="flex items-center gap-2">
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
                <div className="flex justify-center gap-2 mt-4">
                    <Button
                        variant="secondary"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i + 1}
                            variant={currentPage === i + 1 ? "primary" : "secondary"}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        variant="secondary"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PatientTable;