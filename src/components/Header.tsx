import { CiSearch } from "react-icons/ci";
import { GrAppsRounded } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import Logo from "./Logo";

export default function Header() {
    return (
        <div className="flex justify-between items-center self-stretch p-3">
            <div><Logo/></div>
            <div className="flex justify-end items-center gap-6 w-2/5">
                <CiSearch size={28} />
                <GrAppsRounded size={28} />
                <CgProfile size={28} />
            </div>
        </div>
    )
}