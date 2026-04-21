export const jobDomains = [
  "Construction",
  "Skilled Work",
  "Delivery",
  "Hospitality",
  "Retail",
  "Security",
  "Maintenance",
  "Agriculture",
  "Other",
];

export const jobRolesByDomain: Record<string, string[]> = {
  Construction: [
    "Electrician",
    "Plumber",
    "Mason",
    "Carpenter",
    "Welder",
  ],

  "Skilled Work": [
    "Mechanic",
    "Technician",
    "Tailor",
    "Painter",
    "Fitter",
  ],

  Delivery: [
    "Delivery Boy",
    "Bike Rider",
    "Courier Executive",
  ],

  Hospitality: [
    "Chef",
    "Cook",
    "Waiter",
    "Housekeeping",
  ],

  Retail: [
    "Sales Executive",
    "Cashier",
    "Store Helper",
  ],

  Security: [
    "Security Guard",
  ],

  Maintenance: [
    "Electrician Helper",
    "Plumber Helper",
  ],

  Agriculture: [
    "Farmer",
    "Field Worker",
  ],

  Other: [
    "General Worker",
  ],
};