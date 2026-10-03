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

export interface PlatformStats {
  hospitals: number;
  technicians: number;
  jobs: number;
  machines: number;
  pendingVerifications: number;
  openDisputes: number;
}
