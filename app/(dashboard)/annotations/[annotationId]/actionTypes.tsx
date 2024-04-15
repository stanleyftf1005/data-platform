import { actionVariablesType as vars} from "./actionVariables"

export const actionTypes = [
    {
        value: "Add",
        label: "Add",
        materials: true,
        actionVars: [vars.dropwise, vars.temperature, vars.atmosphere, vars.duration],
    },
    {
        value: "Centrifuge",
        label: "Centrifuge",
        materials: true,
        actionVars: [],
    },
    {
        value: "CollectLayer",
        label: "CollectLayer",
        materials: false,
        actionVars: [vars.layer],
    },
    {
        value: "Combination",
        label: "Combination",
        materials: false,
        actionVars: [vars.action_idx],
    },
    {
        value: "Concentration",
        label: "Concentration",
        materials: false,
        actionVars: [],
    },
    {
        value: "Distill",
        label: "Distill",
        materials: true,
        actionVars: [vars.temperature, vars.pressure],
    },
    {
        value: "DrySolid",
        label: "DrySolid",
        materials: true,
        actionVars: [vars.duration, vars.temperature, vars.atmosphere],
    },
    {
        value: "DrySolution",
        label: "DrySolution",
        materials: true,
        actionVars: [],

    },
    {
        value: "Extract",
        label: "Extract",
        materials: true,
        actionVars: [vars.repetitions],
    },
    {
        value: "Filter",
        label: "Filter",
        materials: true,
        actionVars: [vars.phase_to_keep],
    },
    {
        value: "MakeSolution",
        label: "MakeSolution",
        materials: true,
        actionVars: [vars.proportion],
    },
    {
        value: "Partition",
        label: "Partition",
        materials: true,
        actionVars: [],
    },
    {
        value: "PH",
        label: "PH",
        materials: true,
        actionVars: [vars.pH, vars.dropwise],
    },
    {
        value: "PhaseSeparation",
        label: "PhaseSeparation",
        materials: false,
        actionVars: [],
    },
    {
        value: "Purify",
        label: "Purify",
        materials: false,
        actionVars: [],
    },
    {
        value: "Quench",
        label: "Quench",
        materials: true,
        actionVars: [vars.dropwise, vars.temperature],
    },
    {
        value: "Recrystallize",
        label: "Recrystallize",
        materials: true,
        actionVars: [],
    },
    
    {
        value: "Reflux",
        label: "Reflux",
        materials: false,
        actionVars: [vars.duration, vars.temperature],
    },
    {
        value: "SetTemperature",
        label: "SetTemperature",
        materials: false,
        actionVars: [vars.temperature],
    },
    {
        value: "Stir",
        label: "Stir",
        materials: false,
        actionVars: [vars.duration, vars.temperature, vars.atmosphere],
    },
    {
        value: "Wait",
        label: "Wait",
        materials: false,
        actionVars: [vars.duration, vars.temperature],
    },
    {
        value: "Wash",
        label: "Wash",
        materials: true,
        actionVars: [vars.repetitions],
    },
    {
        value: "Yield",
        label: "Yield",
        materials: true,
        actionVars: [],
    },
        
    

    ]