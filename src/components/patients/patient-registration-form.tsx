import { AddPatientFlow } from "./types";

interface PatientRegistrationFormProps {
    setState: (state: AddPatientFlow) => void;
}

export const PatientRegistrationForm = ({ setState }: PatientRegistrationFormProps) => {
    return (
        <div>
            <h1>Patient Registration Form</h1>
            <button onClick={() => setState("dashboard")}>Back</button>
        </div>
    )
}