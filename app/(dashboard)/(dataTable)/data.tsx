import {
    RxArrowDown,
    RxArrowRight,
    RxArrowUp,
    RxCheckCircled,
    RxCircle,
    RxCrossCircled,
    RxQuestionMarkCircled,
    RxStopwatch,
  } from "react-icons/rx"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "Pending",
      label: "Pending",
      //icon: RxCircle,
    },
    {
      value: "Completed",
      label: "Completed",
      //icon: RxStopwatch,
    },
    {
      value: "Approved",
      label: "Approved",
      //icon: RxCheckCircled,
    },
    {
      value: "Rejected",
      label: "Rejected",
      //icon: RxCrossCircled,
    },
    {
      value: "Invalid",
      label: "Invalid",
      //icon: RxCrossCircled,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      //icon: RxArrowDown,
    },
    {
      label: "Medium",
      value: "medium",
      //icon: RxArrowRight,
    },
    {
      label: "High",
      value: "high",
      //icon: RxArrowUp,
    },
  ]