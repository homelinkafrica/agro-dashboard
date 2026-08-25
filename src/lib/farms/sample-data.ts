import type { Farm } from "./types";

/**
 * Sample farms so the Farms list page has something to show.
 * TODO: replace with real data once farms are backed by the API.
 */
export const sampleFarms: Farm[] = [
  {
    id: "farm-1",
    name: "KingsFarm",
    areaHectares: 12.5,
    fieldCount: 4,
    farmerName: "Byasi Solomon",
    email: "solomonbyasi@gmail.com",
    address: "Budaka",
  },
  {
    id: "farm-2",
    name: "Green Valley Farm",
    areaHectares: 8.2,
    fieldCount: 3,
    farmerName: "Nakato Grace",
    email: "nakato.grace@example.com",
    address: "Mbale",
  },
  {
    id: "farm-3",
    name: "Sunrise Agro",
    areaHectares: 20,
    fieldCount: 6,
    farmerName: "Okello Peter",
    email: "okello.peter@example.com",
    address: "Soroti",
  },
];
