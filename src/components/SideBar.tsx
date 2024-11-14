import { IconType } from "react-icons";
import SideBarItem from "./SidebarItem";
import { 
    MdSpaceDashboard,
    MdOutlineCalendarToday,
    MdOutlinePeopleAlt,
    MdMedicalInformation,
    MdOutlineElectricalServices,
    MdMeetingRoom,
    MdOutlineSettings
} from "react-icons/md";

export default function SideBar() {

    interface sidebaritem {
        icon: IconType,
        title: string,
        link?: string,
        active?: boolean,
    }

    const sidebarItems: sidebaritem[] = [
        {
            icon: MdSpaceDashboard,
            title: "Dashboard"
        },
        {
            icon: MdOutlineCalendarToday,
            title: "Appointments",
            active: true
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
        {
            icon: MdOutlineSettings,
            title: "Settings"
        },
    ]


    return (
        <div className="flex flex-col items-start">
            <div className="flex py-2 flex-col gap-1 items-start self-stretch">
                {sidebarItems.map((sidebaritem, index) => <SideBarItem key={index} metadata={sidebaritem}/>)}
            </div>
        </div>
    )
}