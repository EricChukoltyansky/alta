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

export interface PaginatedResponse {
  data: Location[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const locationsApi = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  }) => apiClient.get("/locations", { params }),

  getOne: (id: string) => apiClient.get(`/locations/${id}`),

  create: (data: Omit<Location, "_id" | "createdAt" | "updatedAt">) =>
    apiClient.post("/locations", data),

  update: (
    id: string,
    data: Partial<Omit<Location, "_id" | "createdAt" | "updatedAt">>
  ) => apiClient.patch(`/locations/${id}`, data),

  delete: (id: string) => apiClient.delete(`/locations/${id}`),
};
