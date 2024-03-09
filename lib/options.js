const categories = [
    "permits",
    "atmospheric monitoring",
    "situations",
    "hazards",
    "hazard controls",
    "ppe",
    "emergency response"
]

const permits = [
    "Hot Work",
    "Lockout/Tag-out",
    "Excavation",
    "Confined Space",
    "Roadway Traffic"
]

const atmMonitoring = [
    "Oxygen Concentration",
    "Combustible Gas/Flammable Vapors",
    "Hazardous/Toxic Gas",
    "Are concentration levels safe?"
]

const companyNames = [
    "Maersk Shipping",
    "Werner, Inc.",
    "Tonka Trucks",
    "Random, LLC"
]

const supervisors = [
    "Grammont, Steve",
    "Mazurek, Ben",
    "Sosa, Tony",
    "Manto, Karl"
]

const foremenData = [
    "G, Steve",
    "M, Ben",
    "S, Tony",
    "M, Karl"
]

const situations = [
    "Confined Spaces",
    "Aerial man-lifts",
    "Lockout/Tagout",
    "Excavations",
    "Trenches",
    "Motorized Equipment",
    "Ground Supported Scaffold",
    "Mobile/Rubber Tire Crane",
    "Tower Crane",
    "A-Frame Ladders",
    "Extension Ladders",
    "Scissors",
    "Opening/Isolation of equipment",
    "Loading/Unloading > 50lbs.",
    "Work on live equipment",
    "Welding",
    "Burning/Cutting operations",
    "Work at Heights > 6'"
]

const hazards = [
    "Airborne Particulates",
    "Body Stress (hot/cold)",
    "Lightning",
    "Noise",
    "Radiation",
    "Chemical Exposure (skin/eyes/inhalation)",
    "Flammable Materials",
    "Overhead Work",
    "Motorized Equipment",
    "Acess/Egress Paths",
    "Floor Cut-outs",
    "Falls",
    "Slip/Trip Hazards",
    "Pinch Points",
    "Electric Shock",
    "Sharp Objects",
    "Thermal Burns",
    "Housekeeping",
    "Obstructed View",
    "Awkward Positioning",
    "Insects/Animals",
    "Walking Surfaces",
    "Public Traffic (vehicle/foot)",
    "Repetitive Motion",
    "Lifting",
    "Material Handling"
]

const hazardControls = [
    "Hazard Assessment",
    "Pre-task Planning",
    "Worker Training",
    "Equipment Selection",
    "Equipment Inspection",
    "Permits developed and reviewed",
    "Work area verification of conditions",
    "Review of As-builts",
    "Utility owners contacted",
    "Utilities located and confirmed",
    "Equipment operators qualified",
    "Equipment training documented and on-hand",
    "Atmospheric Testing",
    "Walking/working surfaces clear and unobstructed",
    "Proper storage of material and equipment",
    "Equipment warning/safety devices operational",
    "Proper lifting/placement/securing of material",
    "Fall protection in place/inspected/maintained",
    "Housekeeping maintained daily and verified",
    "Fire protection measures in place",
    "Equipment grounded/bonded",
    "Flash burns shielded",
    "Spark containment",
    "Flow able material contained",
    "Emergency response in place and communicated",
    "Barricades/covers/signs in place and secure",
    "Live Equipment Isolated?"
]

const properPpe = [
    "Protective Suits",
    "Hard Hats",
    "Safety Glasses",
    "Face Shield/Goggles",
    "Traffic Safety Clothing",
    "Fall Protection",
    "Hearing Protection",
    "Gloves",
    "Respirator",
    "Foot Protection"
]

const emergencyResponse = [
    "Fire Extinguishers location?",
    "SDS location?",
    "Eye Wash Station location?",
    "First-Aid AED location?",
    "Emergency alarm sound?",
    "Muster Point location?"
]

module.exports = {
    categories,
    permits,
    atmMonitoring,
    companyNames,
    supervisors,
    foremenData,
    situations,
    hazards,
    hazardControls,
    properPpe,
    emergencyResponse
}