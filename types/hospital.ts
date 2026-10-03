export type HospitalStatus = "active" | "suspended" | "new";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Hospital {
  id: string;
  name: string;
  area: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  status: HospitalStatus;
  bedCount: number;
  coordinates: GeoPoint;
  createdAt: string;
}

export interface HospitalSummary extends Hospital {
  machinesCount: number;
  openJobsCount: number;
}

export type HospitalProfileInput = Pick<Hospital, "name" | "area" | "city" | "state" | "address" | "phone" | "email" | "bedCount">;
