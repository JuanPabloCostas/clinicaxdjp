'use client';

import { useState } from "react";

import { AddPatientFlow } from "./types";
import { PatientDashboard } from "./patient-dashboard";
import { PatientRegistrationForm } from "./patient-registration-form";

export const PatientScreen = () => {
    const [state, setState] = useState<AddPatientFlow>("dashboard");

    return (
        <div>
            {state === "dashboard" ? <PatientDashboard setState={setState} /> : <PatientRegistrationForm setState={setState} />}
        </div>
    )
}