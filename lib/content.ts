export type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  art: "burger" | "skewer" | "fries" | "shake";
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "burgers",
    label: "Burgers",
    art: "burger",
    items: [
      { name: "The Bunfire", description: "Two smashed patties, aged cheddar, coal-charred onion, pickles, fire sauce.", price: "13.50", tag: "Most ordered" },
      { name: "Green Chili Smash", description: "Single patty, roasted green chili, pepper jack, lime crema, crispy shallots.", price: "12.00" },
      { name: "Smoke Show", description: "Patty plus 12-hour brisket, smoked gouda, burnt-end jam on a toasted bun.", price: "15.50" },
      { name: "Mushroom Melt", description: "Grilled portobello, swiss, caramelised onion, garlic aioli. Meat-free.", price: "11.50" },
    ],
  },
  {
    id: "grill",
    label: "Off the grill",
    art: "skewer",
    items: [
      { name: "Chicken thigh skewers", description: "Yogurt and smoked paprika marinade, charred on the coals, herb salsa.", price: "12.50" },
      { name: "Lamb kofta", description: "Hand-rolled lamb with cumin and mint, flatbread, pickled red onion.", price: "14.00", tag: "New" },
      { name: "Half chicken", description: "Brined overnight, flame-grilled, lemon and chili butter.", price: "16.00" },
      { name: "Charred corn", description: "Two cobs, chipotle butter, crumbled feta, lime.", price: "6.50" },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    art: "fries",
    items: [
      { name: "Hand-cut fries", description: "Twice fried, sea salt. Add fire sauce for 1.00.", price: "4.50" },
      { name: "Onion rings", description: "Buttermilk batter, smoked salt, ranch for dipping.", price: "5.50" },
      { name: "Grilled halloumi fries", description: "Honey, chili flakes, mint.", price: "7.00" },
      { name: "Crunch slaw", description: "Red cabbage, apple, lime dressing.", price: "4.00" },
    ],
  },
  {
    id: "shakes",
    label: "Shakes",
    art: "shake",
    items: [
      { name: "Burnt caramel", description: "Caramel cooked dark, vanilla ice cream, sea salt.", price: "6.50" },
      { name: "Pistachio", description: "Real pistachio paste, whipped cream, crushed nuts.", price: "7.00", tag: "Staff pick" },
      { name: "Malted vanilla", description: "Old-school malt, vanilla bean, a cherry on top.", price: "6.00" },
      { name: "Chocolate smoke", description: "Dark chocolate and a little smoked sugar.", price: "6.50" },
    ],
  },
];

export type Location = {
  name: string;
  address: string;
  hours: string;
  note: string;
};

export const locations: Location[] = [
  { name: "Old Market", address: "14 Granary Lane", hours: "Daily 12:00 to 00:00", note: "Our first grill. Open kitchen, 60 seats." },
  { name: "Riverside", address: "2 Wharf Street, Unit 5", hours: "Daily 12:00 to 01:00", note: "Terrace seating by the water." },
  { name: "Station Square", address: "88 Platform Road", hours: "Mon to Sat 11:00 to 23:00", note: "Fast counter for takeaway." },
];

export const guestOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 guests", "8 or more"];

export const timeOptions = ["12:00", "12:30", "13:00", "13:30", "14:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
