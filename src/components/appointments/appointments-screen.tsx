'use client';

import { useState } from "react";

import { AddAppointmentFlow } from "../types";
import { AppointmentsDashboard } from "./appointments-dashboard";
import { AppointmentsRegistration } from "./appointments-registration";

export const AppointmentsScreen = () => {
    const [state, setState] = useState<AddAppointmentFlow>("dashboard");

    return (
        <>
            {state === "dashboard" ? <AppointmentsDashboard setState={setState} /> : <AppointmentsRegistration setState={setState} />}
        </>
    )
}