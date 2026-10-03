import type { FaqItem } from "@/types/content";

export const faqItems: FaqItem[] = [
  {
    question: "Is Biofix free?",
    answer:
      "Yes. Biofix is free for hospitals, nurses and biomedical technicians. There are no subscriptions or platform fees. Hospitals pay technicians directly for the repairs they carry out.",
  },
  {
    question: "What is Biofix?",
    answer:
      "Biofix is hospital equipment management software built for Nigeria. It keeps a live register of every machine in your hospital, lets nurses report faults from their phones, and connects you to verified biomedical technicians who fix them.",
  },
  {
    question: "How do nurses report a broken machine?",
    answer:
      "Every machine gets a Biofix QR sticker. A nurse scans it with their phone camera, takes a photo of the fault, picks what is wrong and sends the report. The hospital admin is notified and posts it as a job, or the nurse can post it straight away on the hospital's behalf, with a phone number, email or in-app chat for technicians to reach them.",
  },
  {
    question: "How are biomedical technicians verified?",
    answer:
      "Technicians upload their biomedical engineering certificate and a government ID. The Biofix team checks each document before the technician can accept jobs. Hospitals also rate every repair, so quality stays visible.",
  },
  {
    question: "How does payment work?",
    answer:
      "The technician sends an itemised quote with parts and labour, and you approve it before any work starts. Once you confirm the machine is working again, you pay the technician directly by cash or bank transfer and mark the job as paid, so Biofix keeps a full record.",
  },
  {
    question: "Does Biofix help with NHIA accreditation?",
    answer:
      "Yes. Biofix keeps a complete maintenance history for every machine, including faults, repairs and preventive services. You can download a maintenance report in one click for NHIA accreditation and internal audits.",
  },
  {
    question: "Does Biofix work on a slow connection or offline?",
    answer:
      "Biofix is a Progressive Web App. You can install it on any Android or iPhone home screen, it loads fast on 3G, and it keeps working when the network drops for a moment.",
  },
  {
    question: "Which cities do you cover?",
    answer:
      "Biofix is live in Lagos and Abuja, with verified technicians in Ikeja, Lekki, Yaba, Surulere, Wuse and Garki. We are adding new cities across Nigeria every quarter.",
  },
];
