export type SubscriptionPlan = "free" | "premium";
export type HospitalStatus = "active" | "suspended" | "trial";

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
  plan: SubscriptionPlan;
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
