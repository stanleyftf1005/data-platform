"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconType } from "react-icons";
import { Icon } from "@radix-ui/react-select";

interface DialogWrapperProps {
    children?: React.ReactNode;
    label?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
}

export default function DialogWrapper({
    children,
    label,
    icon,
    title,
    description,
}: DialogWrapperProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-xl">
            {icon}
            {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {children}
        </div>
        <DialogFooter>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
