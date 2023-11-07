import { Button } from "@/components/ui/button"
import { IconType } from "react-icons"
import {cn} from '@/lib/utils'

interface ButtonWithIconProps {
    label: string;
    className?: string;
    icon: IconType;
    variant?: string;
}

export function ButtonWithIcon({ label, icon: Icon, className, variant}: ButtonWithIconProps) {
  return (
    <Button className={cn('', className)} variant={variant}>
      <Icon className="mr-2 h-4 w-4" /> {label}
    </Button>
  )
}
