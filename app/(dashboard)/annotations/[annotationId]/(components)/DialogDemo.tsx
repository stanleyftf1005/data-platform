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

interface DialogDemoProps {
  label: string
  annotation?: string[]
}

export function DialogDemo({label, annotation}: DialogDemoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-4 py-2 rounded-xl text-sm font-medium">{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {annotation?.map((item, index) => {
            return (
              <div key={index}>
                {item}
              </div>
            )
          })}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
