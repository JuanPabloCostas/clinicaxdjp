'use client';

import { usePathname } from 'next/navigation';
import { IconType } from "react-icons";
import { 
    MdSpaceDashboard,
    MdOutlineCalendarToday,
    MdOutlinePeopleAlt,
    MdMedicalInformation,
    MdOutlineElectricalServices,
    MdMeetingRoom,
    MdOutlineSettings
} from "react-icons/md";

import SidebarItem from "./SidebarItem";

export default function SideBar() {
    const pathname = usePathname();

    interface sidebaritem {
        icon: IconType,
        title: string,
    }

    const sidebarItems: sidebaritem[] = [
        // {
        //     icon: MdSpaceDashboard,
        //     title: "Dashboard"
        // },
        {
            icon: MdOutlineCalendarToday,
            title: "Appointments"
        },
        {
            icon: MdOutlinePeopleAlt,
            title: "Patients"
        },
        {
            icon: MdMedicalInformation,
            title: "Doctors"
        },
        {
            icon: MdOutlineElectricalServices,
            title: "Machines"
        },
        {
            icon: MdMeetingRoom,
            title: "Rooms"
        },
        // {
        //     icon: MdOutlineSettings,
        //     title: "Settings"
        // },
    ]

    const isActiveRoute = (path: string) => {
        // Exact match for home page
        if (path === '/') {
            return pathname === '/';
        }
        // For other routes, check if pathname starts with the path
        return pathname.startsWith(path);
    };

    return (
        <div className="flex flex-col py-2 gap-1 items-stretch">
            {sidebarItems.map((sidebaritem, index) => (
                <SidebarItem key={index} metadata={{icon: sidebaritem.icon, title: sidebaritem.title, isActiveRoute: isActiveRoute(`/${sidebaritem.title.toLowerCase()}`)}} />
            ))}
        </div>
    )
}