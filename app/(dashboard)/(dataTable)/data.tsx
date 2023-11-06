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
      value: "pending",
      label: "Pending",
      //icon: RxCircle,
    },
    {
      value: "processed",
      label: "Processed",
      //icon: RxStopwatch,
    },
    {
      value: "approved",
      label: "Approved",
      //icon: RxCheckCircled,
    },
    {
      value: "rejected",
      label: "Rejected",
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