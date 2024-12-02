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
import { get } from 'http';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'date-fns';

// Tipo para paciente
interface Patient {
    id?: string;
    firstName: string;
    email: string;
    phoneNumber: string;
}

interface Machine {
    id: string;
    machineName: string;
    type: string;
    // roomId: string;
    roomName: string;
    status: string;
}

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    email: string;
    phoneNumber: string;
}

interface Appointment {
    patientId: string;
    machineId: string;
    userId: string;
    date?: Date;
    reason: string;
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


    const [patients, setpatients] = useState<Patient[]>([
        { id: '1', firstName: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890' },
        { id: '2', firstName: 'Jane Smith', email: 'jane@example.com', phoneNumber: '123-456-7891' },
    ])

    const [machines, setmachines] = useState<Machine[]>([
        { id: '1', machineName: 'Machine 1', type: 'Type 1', roomName: 'Room 1', status: "Operational" },
        { id: '2', machineName: 'Machine 2', type: 'Type 2', roomName: 'Room 2', status: "Operational" },
    ])

    const [doctors, setdoctors] = useState<Doctor[]>([
        { id: '1', name: 'Dr. John Doe', specialty: 'Cardiology', email: 'john@example.com', phoneNumber: '123-456-7890' },
        { id: '2', name: 'Dr. Jane Smith', specialty: 'Pediatrics', email: 'jane@example.com', phoneNumber: '123-456-7891' },
    ])

    const [appointmentData, setAppointmentData] = useState<Appointment>({
        patientId: '',
        machineId: '',
        userId: '',
        date: new Date(),
        reason: '',
    });

    const successToast = () => {
        toast.success("Creacion exitosa");
    }

    const missingToast = () => {
        toast.error("Faltan campos");
    }

    const errorToast = () => {
        toast.error("Hubo un error", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    

    const getPatients = async () => {
        const response = await fetch("/api/patients", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json());
        setpatients(response.patients)
    }

    const getMachines = async () => {
        const response = await fetch("/api/machines", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json());
        setmachines(response.machines)
    }

    const getDoctors = async () => {
        const response = await fetch("/api/doctors", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json());
        setdoctors(response.doctors)
    }

    

    // Efecto para filtrar pacientes basado en el término de búsqueda
    useEffect(() => {
        if (searchTerm) {
            const filtered = patients.filter(patient =>
                patient.firstName.toLowerCase().includes(searchTerm.toLowerCase())
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
        setSearchTerm(patient.firstName);
        setIsSearching(false);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const reqBody = {
            patientId: selectedPatient?.id,
            machineId: appointmentData.machineId,
            userId: appointmentData.userId,
            Date: appointmentData.date,
            reason: appointmentData.reason,
        }

        const response = await fetch("/api/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        }).then(res => res.json());

        if (response.code === 200) {
            successToast()
            await new Promise(resolve => setTimeout(resolve, 500));
            setState('dashboard')
        } else if (response.code === 401) {
            missingToast()
        } else {
            errorToast()
        }
    }

    useEffect(() => {
        getPatients();
        getMachines();
        getDoctors();
    }, [])

    return (
        <form action="" method='' className="flex flex-col py-1 mx-auto w-3/5 gap-4">
            <ToastContainer />
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
                                            <div className="font-medium">{patient.firstName}</div>
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
                        value={selectedPatient?.phoneNumber || ''} 
                        placeholder='Enter patient phone'
                        readOnly 
                    />
                </div>

                {/* Resto de los campos del formulario */}
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="machine">Machine</Label>
                    <Select onValueChange={(e) => setAppointmentData({ ...appointmentData, machineId: e })}>
                        <SelectTrigger id='machine'>
                            <SelectValue placeholder="Select a machine" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* <SelectItem value="department1">Department 1</SelectItem>
                            <SelectItem value="department2">Department 2</SelectItem>
                            <SelectItem value="department3">Department 3</SelectItem>
                            <SelectItem value="department4">Department 4</SelectItem> */}
                            {machines.map((machine) => (
                                <SelectItem key={machine.id} value={machine.id}>
                                    {machine.machineName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Resto de los campos del formulario */}
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="doctor">Doctor</Label>
                    <Select onValueChange={(e) => setAppointmentData({ ...appointmentData, userId: e })}>
                        <SelectTrigger id='doctor'>
                            <SelectValue placeholder="Select a Doctor" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* <SelectItem value="department1">Department 1</SelectItem>
                            <SelectItem value="department2">Department 2</SelectItem>
                            <SelectItem value="department3">Department 3</SelectItem>
                            <SelectItem value="department4">Department 4</SelectItem> */}
                            {doctors.map((doctor) => (
                                <SelectItem key={doctor.id} value={doctor.id}>
                                    {doctor.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* <div className="flex flex-col gap-3">
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
                </div> */}
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="date">Date</Label>
                    <DatePicker 
                        showTimePicker
                        onChange={(e) => setAppointmentData({ ...appointmentData, date: e })}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="reason">Reason for Appointment</Label>
                    <Input id="reason" type="text" placeholder='Enter reason for appointment' onChange={(e) => setAppointmentData({ ...appointmentData, reason: e.target.value })} />
                </div>
                {/* <div className="flex flex-col gap-3">
                    <Label className='font-semibold' htmlFor="study">Upload Study</Label>
                    <Input id="study" type="file" />
                </div> */}
            </div>
            <div className='w-full flex flex-row justify-between'>
                <Button type="button" variant="destructive" onClick={() => setState('dashboard')}>Cancel</Button>
                <Button type="button" variant="green" onClickCapture={handleSubmit}>Register</Button>
            </div>
        </form>
    );
};

export default AppointmentsRegistration;