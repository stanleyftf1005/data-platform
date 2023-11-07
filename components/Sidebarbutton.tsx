import Link from "next/link";
import { Button } from "./ui/button";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

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
            <Button variant={active ? "secondary" : "ghost"} className={cn("w-full justify-start align-middle", (!active ? "text-neutral-500": ""))}>
                <Icon className="mr-3 h-5 w-5 stroke-[2px]"/>
                <div className={cn("text-base", !active?"font-normal":"font-semibold")}>{label}</div>
            </Button>
        </Link>
    );
}


export default Sidebarbutton