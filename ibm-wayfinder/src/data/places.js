import { generatedRooms } from "./generatedRooms.js";

export const places = [
  {
    id: "room-a201",
    label: "Room A201",
    type: "Office",
    floor: 2,
    aliases: ["a201", "room 201", "workspace"],
    x: 72,
    y: 42
  },
  {
    id: "office-100",
    label: "Office 100",
    type: "Office",
    floor: 9,
    aliases: ["office one hundred", "100", "manager office"],
    x: 72,
    y: 37
  },
  {
    id: "client-center",
    label: "Client Center",
    type: "Meeting room",
    floor: 1,
    aliases: ["client", "meeting", "conference"],
    x: 78,
    y: 58
  },
  {
    id: "restrooms",
    label: "Restrooms",
    type: "Amenity",
    floor: 1,
    aliases: ["bathroom", "toilet", "washroom"],
    x: 30,
    y: 32
  },
  {
    id: "elevator-a",
    label: "Elevator A",
    type: "Elevator",
    floor: 1,
    aliases: ["lift", "elevator", "vertical core"],
    x: 48,
    y: 46
  },
  {
    id: "reception",
    label: "Reception",
    type: "Lobby",
    floor: 1,
    aliases: ["front desk", "lobby", "entry"],
    x: 24,
    y: 68
  }
];

export const searchablePlaces = [...places, ...generatedRooms];

export const commonDestinations = ["Room A201", "Office 100", "Client Center", "Restrooms"];
