'use client'

interface StepProps {
    step: {
        id: number;
        actions: string;
    }

}

export const Step = ({step}:StepProps) => {
  return (
   
    <div className="flex rounded-xl border justify-between p-4 text-base">
        {step.id}
    </div>

  )
}

export default Step