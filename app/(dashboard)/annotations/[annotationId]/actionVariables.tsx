export const actionVariablesType = {
    "atmosphere": {
        "name": "Atmosphere",
        "description": "The atmosphere condition during the execution of the action",
        "comment": "Examples: vacuum, nitrogen"
    },
    "duration": {
        "name": "Duration",
        "description": "The duration of the action",
        "comment": "Examples: 10 h, overnight, 80s",
    },
    "dropwise": {
        "name": "Dropwise",
        "description": "A boolean variable indicating whether the material dropwise should be added dropwise",
        "comment": "Input “true” for adding the material dropwise and empty the input for other situations",
    },
    "layer": {
        "name": "Layer",
        "description": "The organic laryer or aqueous layer to be collected",
        "comment": "Input “organic” if the organic layer is collected or “aqueous” if the aqueous layer is collected",
    },
    "action_idx": {
        "name": "Action_idx",
        "description": "The sequence of previously conducted actions",
        "comment": "Use “-” to range the sequence number. Examples: 1-3, 3-9",
    },
    "phase_to_keep": {
        "name": "Phase_to_keep",
        "description": "The phase to keep after filteration",
        "comment": "Input “filtrate” or “precipitate” according the phase kept after filteration.",
    },
    "repetitions": {
        "name": "Repetitions",
        "description": "The number of repetitions for an action",
        "comment": "Examples: 1, 2",
    },
    "temperature": {
        "name": "Temperature",
        "description": "The temperature at which the action is performed",
        "comment": "For convenience, we use “C” to represent “°C”. Examples: 20 C, 0 C",
    },
    "proportion": {
        "name": "Proportion",
        "description": "The proportion of substances in a solution",
        "comment": "Examples: 3:1, 4:5:1",
    },
    "pressure": {
        "name": "Pressure",
        "description": "The pressure during the execution of the action",
        "comment": "Examples: 10 mm, 300 kPa",
    },
    "pH": {
        "name": "pH",
        "description": "The pH value during the execution of the action",
        "comment": "Examples: 1,2,14",
    },
    "text": {
        "name": "Text",
        "description": "The pH value duriThe   text   that   should   introduce   new action type to describeng the execution of the action",
        "comment": "",
    },
    "explanation": {
        "name": "Explanation",
        "description": "The reason why you choose the Others action. ",
        "comment": "Input your suggestion for the new action type to describe the text with no more than 200 words",
    },
    
}