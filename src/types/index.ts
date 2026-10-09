export type Role = "ADMIN" | "DONOR" | "RECIPIENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  bloodGroup?: string;
  city?: string;
  phone?: string;
}

export interface BloodRequest {
  id: string;
  bloodGroup: string;
  unitsNeeded: number;
  hospitalName: string;
  hospitalAddress: string;
  contactNumber: string;
  emergencyLevel: "NORMAL" | "URGENT" | "CRITICAL";
  status: "PENDING" | "APPROVED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}