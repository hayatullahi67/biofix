import type { Review } from "@/types";
import { daysAgo } from "./dates";

type ReviewRow = [technicianId: string, hospitalId: string, hospitalName: string, rating: number, comment: string, days: number];

const rows: ReviewRow[] = [
  ["tech-1", "hosp-1", "Grace Specialist Hospital", 5, "Arrived within 40 minutes and had the defibrillator charging again before the night shift. Clear quote, no surprises.", 19],
  ["tech-1", "hosp-1", "Grace Specialist Hospital", 5, "Explained the fan fault to our ICU team and left a short maintenance checklist. Excellent.", 39],
  ["tech-1", "hosp-2", "Harmony Medical Centre", 4, "Good work on our monitors. Needed a second visit for a part but kept us updated.", 70],
  ["tech-1", "hosp-4", "Unity Specialist Hospital", 5, "Very professional and respectful of theatre protocols.", 110],
  ["tech-2", "hosp-4", "Unity Specialist Hospital", 5, "Fixed our X-ray generator in one visit.", 14],
  ["tech-3", "hosp-1", "Grace Specialist Hospital", 5, "Dialysis machine back in service the same day.", 2],
  ["tech-4", "hosp-3", "Riverside Children's Clinic", 5, "Great with neonatal equipment, very thorough.", 33],
  ["tech-5", "hosp-2", "Harmony Medical Centre", 4, "Solid work, communication could be faster.", 48],
];

export const seedReviews: Review[] = rows.map(([technicianId, hospitalId, hospitalName, rating, comment, days], index) => ({
  id: `rev-${index + 1}`,
  technicianId,
  hospitalId,
  hospitalName,
  jobId: `job-hist-${index + 1}`,
  rating,
  comment,
  createdAt: daysAgo(days),
}));
