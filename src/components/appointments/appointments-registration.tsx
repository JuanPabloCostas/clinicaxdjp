import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../input';
import { Label } from '../label';
import { Button } from '../button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../select";
import { MdSearch } from 'react-icons/md';
import { AddAppointmentFlow } from '../types';
import { DatePicker } from '../datePicker';

// Tipo para paciente
interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
}

interface AppointmentRegistrationProps {
    setState: (state: AddAppointmentFlow) => void;
}

export const AppointmentsRegistration = ({ setState }: AppointmentRegistrationProps) => {
    const router = useRouter();

    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para los pacientes filtrados
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    // Estado para el paciente seleccionado
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    // Estado para mostrar/ocultar el dropdown
    const [isSearching, setIsSearching] = useState(false);

    // Datos de ejemplo - En producción, esto vendría de tu API
    const patients: Patient[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '123-456-7891' },
        // ... más pacientes
    ];

    // Efecto para filtrar pacientes basado en el término de búsqueda
    useEffect(() => {
        if (searchTerm) {
            const filtered = patients.filter(patient =>
                patient.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPatients(filtered);
            setIsSearching(true);
        } else {
            setFilteredPatients([]);
            setIsSearching(false);
        }
    }, [searchTerm]);

    // Función para seleccionar un paciente
    const handlePatientSelect = (patient: Patient) => {
        setSelectedPatient(patient);
        setSearchTerm(patient.name);
        setIsSearching(false);
    };

    return (
        <form action="#" method='post' className="flex flex-col py-1 mx-auto w-3/5 gap-4">
            <h1 className="text-2xl font-bold mb-4">Register New Appointment</h1>
            <div className='flex flex-col gap-4'>
                <div className="flex flex-col gap-3 relative">
                    <Label className='font-semibold' htmlFor="patient">Patient Name</Label>
                    <div className="relative">
                        <Input
                            id="patient-search"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search patient..."
                            className="pr-10"
                        />
                        <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    
                    {/* Dropdown de resultados de búsqueda */}
                    {isSearching && (
                        <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg mt-1 z-50">
                            {filteredPatients.length > 0 ? (
                                <div className="max-h-60 overflow-y-auto">
                                    {filteredPatients.map((patient) => (
                                        <div
                                            key={patient.id}
                                            className="p-3 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handlePatientSelect(patient)}
                                        >
                                            <div className="font-medium">{patient.name}</div>
                                            <div className="text-sm text-gray-500">{patient.email}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4">
                                    <p className="text-gray-500 mb-2">No patients found</p>
                                    <Button
                                        type="button"
                                        variant="green"
                                        onClick={() => router.push('/patients')}
                                        className="w-full"
                                    >
                                        Register New Patient
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Campos auto-completados cuando se selecciona un paciente */}
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="patient-email">Patient Email</Label>
                    <Input 
                        id="patient-email" 
                        type="email" 
                        value={selectedPatient?.email || ''} 
                        placeholder='Enter patient email'
                        readOnly 
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="patient-phone">Patient Phone</Label>
                    <Input 
                        id="patient-phone" 
                        type="tel" 
                        value={selectedPatient?.phone || ''} 
                        placeholder='Enter patient phone'
                        readOnly 
                    />
                </div>

                {/* Resto de los campos del formulario */}
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="department">Department</Label>
                    <Select>
                        <SelectTrigger id='department'>
                            <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="department1">Department 1</SelectItem>
                            <SelectItem value="department2">Department 2</SelectItem>
                            <SelectItem value="department3">Department 3</SelectItem>
                            <SelectItem value="department4">Department 4</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="machine">Operational Machine</Label>
                    <Select>
                        <SelectTrigger id='machine'>
                            <SelectValue placeholder="Select a machine" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="machine1">Machine 1</SelectItem>
                            <SelectItem value="machine2">Machine 2</SelectItem>
                            <SelectItem value="machine3">Machine 3</SelectItem>
                            <SelectItem value="machine4">Machine 4</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="date">Date</Label>
                    <DatePicker />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="reason">Reason for Appointment</Label>
                    <Input id="reason" type="text" placeholder='Enter reason for appointment' />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="study">Upload Study</Label>
                    <Input id="study" type="file" />
                </div>
            </div>
            <div className='w-full flex flex-row justify-between'>
                <Button type="button" variant="destructive" onClick={() => setState('dashboard')}>Cancel</Button>
                <Button type="submit" variant="green">Register</Button>
            </div>
        </form>
    );
};

export default AppointmentsRegistration;