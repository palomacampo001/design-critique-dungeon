export const floors = [1, 2, 8, 9, 10];

export const floorGeometry = {
  1: {
    label: "Floor 1",
    svg: "/floors/floor-01-stripped.svg",
    detailSvg: "/floors/oma-floor-01.svg",
    zones: [
      { id: "lobby", label: "Lobby", x: 10, y: 56, w: 32, h: 26 },
      { id: "client", label: "Client Center", x: 58, y: 48, w: 30, h: 30 },
      { id: "amenity", label: "Amenities", x: 16, y: 20, w: 26, h: 18 }
    ],
    corridor: "M 18 64 L 48 64 L 48 46 L 78 46"
  },
  2: {
    label: "Floor 2",
    svg: "/floors/floor-02-stripped.svg",
    detailSvg: "/floors/oma-floor-02.svg",
    zones: [
      { id: "office-a", label: "Team Offices", x: 54, y: 22, w: 34, h: 34 },
      { id: "rooms", label: "Rooms A201-A208", x: 12, y: 24, w: 26, h: 40 }
    ],
    corridor: "M 22 46 L 48 46 L 48 42 L 78 42"
  },
  8: {
    label: "Floor 8",
    svg: "/floors/floor-08-stripped.svg",
    detailSvg: "/floors/oma-floor-08.svg",
    zones: [
      { id: "studio", label: "Studio", x: 16, y: 24, w: 28, h: 36 },
      { id: "focus", label: "Focus", x: 58, y: 22, w: 28, h: 28 }
    ],
    corridor: "M 18 44 L 48 44 L 72 44"
  },
  9: {
    label: "Floor 9",
    svg: "/floors/floor-09-stripped.svg",
    detailSvg: "/floors/oma-floor-09.svg",
    zones: [
      { id: "office-100", label: "Office 100", x: 58, y: 22, w: 30, h: 30 },
      { id: "open", label: "Open Office", x: 12, y: 24, w: 34, h: 38 }
    ],
    corridor: "M 20 44 L 48 44 L 72 37"
  },
  10: {
    label: "Floor 10",
    svg: "/floors/floor-10-stripped.svg",
    detailSvg: "/floors/oma-floor-10.svg",
    zones: [
      { id: "cafe", label: "Cafe", x: 14, y: 24, w: 28, h: 24 },
      { id: "meeting", label: "Meeting", x: 56, y: 28, w: 30, h: 28 }
    ],
    corridor: "M 18 44 L 48 44 L 74 44"
  }
};
