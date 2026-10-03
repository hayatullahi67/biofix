import { seedHospitals } from "./hospitals";
import { seedJobs, seedReports } from "./jobs";
import { seedMachineDocuments, seedMachineEvents } from "./machine-history";
import { seedMachines } from "./machines";
import { seedInvites, seedNotifications } from "./notifications";
import { seedBilling, seedDisputes, seedPayouts, seedTransactions } from "./payments";
import { seedReviews } from "./reviews";
import { seedTechnicians } from "./technicians";
import { seedUsers } from "./users";

export { DEMO_PASSWORD } from "./users";

export function createSeedDatabase() {
  return structuredClone({
    hospitals: seedHospitals,
    users: seedUsers,
    technicians: seedTechnicians,
    machines: seedMachines,
    machineEvents: seedMachineEvents,
    machineDocuments: seedMachineDocuments,
    reports: seedReports,
    jobs: seedJobs,
    reviews: seedReviews,
    transactions: seedTransactions,
    billing: seedBilling,
    payouts: seedPayouts,
    disputes: seedDisputes,
    notifications: seedNotifications,
    invites: seedInvites,
    credentials: {} as Record<string, string>,
  });
}

export type MockDatabase = ReturnType<typeof createSeedDatabase>;
