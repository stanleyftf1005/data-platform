import Link from "next/link";
import { Button } from "./ui/button";
import { IconType } from "react-icons";

interface SidebarbuttonProps {
    active?: boolean;
    label: string;
    icon: IconType;
    href: string;
}

const Sidebarbutton: React.FC<SidebarbuttonProps> = ({
    active,
    label,
    icon: Icon,
    href,
}) => {
    return (
        <Link href={href} className="flex">
            <Button variant={active ? "secondary" : "ghost"} className="w-full justify-start align-middle">
                <Icon className="mr-3 h-5 w-5 stroke-[2px]"/>
                <div className="text-base font-medium">{label}</div>
            </Button>
        </Link>
    );
}


export default Sidebarbutton