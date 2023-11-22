import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

interface AnnotationSheetProps {
    children?: React.ReactNode;
}

const AnnotationSheet = ({children}:AnnotationSheetProps) => {
  return (
    <Sheet>
    <SheetTrigger>Quick View</SheetTrigger>
    <SheetContent>
        <SheetHeader>
        <SheetTitle>Annotation</SheetTitle>
        <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
        </SheetDescription>
        </SheetHeader>
        {children}
    </SheetContent>
    </Sheet>

  )
}

export default AnnotationSheet