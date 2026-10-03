import type { FaultReport, Job, NewFaultReportInput, ReportSummary } from "@/types";
import { estimatePay, jobTimelineLabels } from "@/lib/domain/job-flow";
import { createId, nowIso } from "@/lib/utils";
import { findOrThrow, mutate, query } from "./client";
import { notifyHospitalAdmins } from "./notifications";

export interface CreatedReport {
  report: FaultReport;
  job: Job;
}

export function createFaultReport(input: NewFaultReportInput): Promise<CreatedReport> {
  return mutate((db) => {
    const machine = findOrThrow(db.machines, input.machineId, "Machine");
    const createdAt = nowIso();
    const report: FaultReport = { ...input, id: createId("REP"), createdAt };
    const reporter = db.users.find((user) => user.id === input.reportedBy);
    const job: Job = {
      id: createId("job"),
      faultReportId: report.id,
      machineId: machine.id,
      hospitalId: machine.hospitalId,
      status: "reported",
      timeline: [{ id: createId("evt"), status: "reported", label: jobTimelineLabels.reported, at: createdAt, actor: reporter?.name }],
      estimatedPay: estimatePay(input.urgency, machine.type),
      createdAt,
      updatedAt: createdAt,
    };
    db.reports.unshift(report);
    db.jobs.unshift(job);
    machine.status = "broken";
    db.machineEvents.push({ id: createId("ev"), machineId: machine.id, type: "fault", title: `Fault reported: ${input.category}`, description: input.description, date: createdAt, actor: reporter?.name });
    notifyHospitalAdmins(db, machine.hospitalId, { kind: "job", title: "New fault reported", body: `${reporter?.name ?? "A nurse"} reported ${machine.name} in ${machine.ward}.`, href: `/hospital/jobs?job=${job.id}` });
    return { report, job };
  });
}

export function listReportsByUser(userId: string): Promise<ReportSummary[]> {
  return query((db) =>
    db.reports
      .filter((report) => report.reportedBy === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((report) => {
        const job = db.jobs.find((candidate) => candidate.faultReportId === report.id);
        return { report, machine: findOrThrow(db.machines, report.machineId, "Machine"), jobId: job?.id ?? "", jobStatus: job?.status ?? "reported" };
      }),
  );
}
