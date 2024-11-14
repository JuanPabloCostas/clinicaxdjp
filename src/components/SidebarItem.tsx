import { IconType } from "react-icons"

interface sidebaritem {
    icon: IconType,
    title: string,
    link?: string,
    active?: boolean,
}

export default function SideBarItem({metadata} : {metadata : sidebaritem}) {

    const IconComponent = metadata.icon
    return(
        <div className={`flex px-2 py-4 items-center gap-4 self-stretch rounded-lg ${metadata.active ? "bg-[#35793729]" : ""} hover:bg-[#35793729] `}>
            <IconComponent size={24} />
            <span>{metadata.title}</span>
        </div>
    )
}