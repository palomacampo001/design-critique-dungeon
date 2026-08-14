const start = {
  id: "start",
  label: "Current location",
  floor: 1,
  x: 24,
  y: 68
};

const elevator = {
  id: "elevator-a",
  label: "Elevator A",
  x: 48,
  y: 46
};

export function buildRoute(destination) {
  const sameFloor = destination.floor === start.floor;

  return {
    start,
    destination,
    elevator,
    floors: sameFloor ? [start.floor] : [start.floor, destination.floor],
    summary: sameFloor ? "2 min walk" : `6 min walk - elevator to ${destination.floor}`,
    distance: sameFloor ? "180 ft" : "420 ft",
    steps: sameFloor
      ? [
          {
            id: "walk-direct",
            floor: start.floor,
            instruction: `Walk east toward ${destination.label}.`,
            detail: "Follow the main corridor.",
            path: [
              [start.x, start.y],
              [48, 64],
              [destination.x, destination.y]
            ]
          }
        ]
      : [
          {
            id: "to-elevator",
            floor: start.floor,
            instruction: "Walk to Elevator A.",
            detail: "Head through the lobby and follow the blue route.",
            path: [
              [start.x, start.y],
              [48, 64],
              [elevator.x, elevator.y]
            ]
          },
          {
            id: "vertical",
            floor: destination.floor,
            instruction: `Take Elevator A to Floor ${destination.floor}.`,
            detail: "Exit and continue on the highlighted floor.",
            path: [
              [elevator.x, elevator.y],
              [elevator.x, elevator.y]
            ]
          },
          {
            id: "to-destination",
            floor: destination.floor,
            instruction: `Continue to ${destination.label}.`,
            detail: `Destination is on Floor ${destination.floor}.`,
            path: [
              [elevator.x, elevator.y],
              [62, 44],
              [destination.x, destination.y]
            ]
          }
        ]
  };
}
