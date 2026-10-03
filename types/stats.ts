export interface HospitalStats {
  totalMachines: number;
  working: number;
  dueService: number;
  broken: number;
}

export interface MonthlyCount {
  month: string;
  value: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  jobs: number;
}

export interface PlatformStats {
  hospitals: number;
  technicians: number;
  jobs: number;
  revenue: number;
  pendingVerifications: number;
  openDisputes: number;
}
