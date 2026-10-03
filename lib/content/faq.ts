import type { FaqItem } from "@/types/content";

export const faqItems: FaqItem[] = [
  {
    question: "What is Biofix?",
    answer:
      "Biofix is hospital equipment management software built for Nigeria. It keeps a live register of every machine in your hospital, lets nurses report faults from their phones, and connects you to verified biomedical technicians who fix them.",
  },
  {
    question: "How do nurses report a broken machine?",
    answer:
      "Every machine gets a Biofix QR sticker. A nurse scans it with their phone camera, takes a photo of the fault, picks what is wrong and sends the report. The hospital admin is notified immediately and can post the job to technicians nearby.",
  },
  {
    question: "How are biomedical technicians verified?",
    answer:
      "Technicians upload their biomedical engineering certificate and a government ID. The Biofix team checks each document before the technician can accept jobs. Hospitals also rate every repair, so quality stays visible.",
  },
  {
    question: "How does payment work?",
    answer:
      "The technician sends a quote with parts and labour. When you approve it, you pay through Paystack and the money is held in escrow. The technician is paid only after you confirm the machine is working again.",
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
