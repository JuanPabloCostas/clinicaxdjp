import Link from 'next/link'; // o import { Link } from 'react-router-dom';

import { IconType } from "react-icons"

interface sidebaritem {
    icon: IconType,
    title: string,
    isActiveRoute: boolean
}

export default function SidebarItem({metadata} : {metadata : sidebaritem}) {
    return (
        <Link href={metadata.title === "Dashboard" ? "/" : `/${metadata.title.toLowerCase()}`}>
            <div className={`w-full flex items-center space-x-2 p-2 rounded-lg ${metadata.isActiveRoute ? 'bg-[#35793729] text-green-600' : ''} hover:bg-[#35793729] hover:text-green-600`}>
                <metadata.icon size={18} />
                <span className="text-sm font-semibold">{metadata.title}</span>
            </div>
        </Link>
    )
}