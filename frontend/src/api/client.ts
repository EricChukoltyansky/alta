import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Location {
  _id: string;
  name: string;
  category: "office" | "store" | "landmark";
  coordinates: {
    lon: number;
    lat: number;
  };
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
