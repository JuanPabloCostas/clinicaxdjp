import { IconType } from "react-icons";
import { VscDashboard } from "react-icons/vsc";
import { CiCalendar, CiSearch } from "react-icons/ci";
import SideBarItem from "./SidebarItem";
import { IoIosHeartHalf } from "react-icons/io";
import { MdOutlineBedroomChild, MdOutlineMedicalInformation } from "react-icons/md";
import { TbWaveSawTool } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

export default function SideBar() {


    interface sidebaritem {
        icon: IconType,
        title: string,
        link?: string,
        active?: boolean,
    }

    const sidebarItems: sidebaritem[] = [
        {
            icon: VscDashboard,
            title: "Dashboard"
        },
        {
            icon: CiCalendar,
            title: "Appointments",
            active: true
        },
        {
            icon: IoIosHeartHalf,
            title: "Patients"
        },
        {
            icon: MdOutlineMedicalInformation,
            title: "Doctors"
        },
        {
            icon: TbWaveSawTool,
            title: "Machines"
        },
        {
            icon: MdOutlineBedroomChild,
            title: "Rooms"
        },
        {
            icon: IoSettingsOutline,
            title: "Settings"
        },
    ]


    return (
        <div className="flex w-80 flex-col items-start">
            <div className="flex py-6 flex-col gap-1 items-start self-stretch">
                {sidebarItems.map((sidebaritem, index) => <SideBarItem key={index} metadata={sidebaritem}/>)}
            </div>
        </div>
    )
}