import type { Technician, TechnicianSkill, VerificationStatus } from "@/types";
import { daysAgo } from "./dates";

type TechRow = [
  id: string,
  name: string,
  email: string,
  area: string,
  city: string,
  lat: number,
  lng: number,
  skills: TechnicianSkill[],
  status: VerificationStatus,
  rating: number,
  completedJobs: number,
  years: number,
];

const rows: TechRow[] = [
  ["tech-1", "Emeka Obi", "tech@biofix.demo", "Ikeja GRA", "Lagos", 6.5821, 3.3584, ["Patient monitors", "Ventilators", "Theatre equipment", "Oxygen systems", "Neonatal equipment", "Dialysis", "Sterilisation"], "verified", 4.8, 142, 9],
  ["tech-2", "Ibrahim Musa", "ibrahim.musa@biofix.pro", "Garki", "Abuja", 9.0333, 7.49, ["X-ray", "Ultrasound", "Patient monitors"], "verified", 4.9, 211, 12],
  ["tech-3", "Kelechi Nnamdi", "kelechi.n@biofix.pro", "Surulere", "Lagos", 6.4969, 3.3481, ["Lab equipment", "Sterilisation", "Dialysis"], "verified", 4.6, 87, 6],
  ["tech-4", "Yetunde Alabi", "yetunde.alabi@biofix.pro", "Yaba", "Lagos", 6.5158, 3.3779, ["Neonatal equipment", "Patient monitors", "Ventilators"], "verified", 4.7, 64, 5],
  ["tech-5", "Samuel Ojo", "samuel.ojo@biofix.pro", "Lekki", "Lagos", 6.4389, 3.5167, ["X-ray", "Theatre equipment", "Oxygen systems"], "verified", 4.5, 39, 4],
  ["tech-6", "Halima Yusuf", "halima.yusuf@biofix.pro", "Maitama", "Abuja", 9.0882, 7.4934, ["Ultrasound", "Lab equipment"], "pending", 0, 0, 3],
  ["tech-7", "Oluwaseun Adeyemi", "seun.adeyemi@biofix.pro", "Ogba", "Lagos", 6.6263, 3.3394, ["Dialysis", "Patient monitors"], "pending", 0, 0, 2],
  ["tech-8", "Daniel Etim", "daniel.etim@biofix.pro", "Ajah", "Lagos", 6.4698, 3.5852, ["Ventilators"], "rejected", 0, 0, 1],
];

export const seedTechnicians: Technician[] = rows.map(
  ([id, name, email, area, city, lat, lng, skills, verificationStatus, rating, completedJobs, years], index) => ({
    id,
    name,
    email,
    phone: `+234 81${index} 333 44${String(index).padStart(2, "0")}`,
    role: "technician",
    bio: `Biomedical engineer with ${years} years of hands-on experience maintaining hospital equipment across ${city}.`,
    skills,
    location: { area, city, lat, lng },
    verificationStatus,
    rejectionReason: verificationStatus === "rejected" ? "Certificate could not be verified with the issuing body." : undefined,
    rating,
    completedJobs,
    yearsExperience: years,
    documents: [
      { id: `${id}-doc-1`, kind: "certificate", name: "Biomedical Engineering Certificate.pdf", uploadedAt: daysAgo(30 + index) },
      { id: `${id}-doc-2`, kind: "government_id", name: "National ID (NIN) slip.jpg", uploadedAt: daysAgo(30 + index) },
    ],
    bankAccount: verificationStatus === "verified" ? { bankName: "GTBank", accountNumber: `01234567${index}${index}`, accountName: name } : undefined,
    createdAt: daysAgo(400 - index * 40),
  }),
);
