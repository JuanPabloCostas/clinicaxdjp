import { 
    MdSearch,
    MdOutlineAccountCircle,
} from "react-icons/md";
import Logo from "./Logo";

export default function Header() {
    return (
        <div className="flex justify-between items-center self-stretch py-4 h-[10vh]">
            <Logo/>
            <div className="flex justify-end items-center gap-6 w-2/5">
                <MdSearch size={28} />
                <MdOutlineAccountCircle size={28} />
            </div>
        </div>
    )
}