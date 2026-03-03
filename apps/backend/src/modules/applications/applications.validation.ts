import { z } from "zod";

export const createApplicationSchema = z.object({
  body: z.object({
    jobId: z.string({ error: "Job ID is required" }),
    name: z
      .string({ error: "Name is required" })
      .min(2, "Name should be at least 2 characters"),
    email: z.string({ error: "Email is required" }).email("Invalid email"),
    resumeLink: z
      .string({ error: "Resume link is required" })
      .url("Invalid resume URL"),
    coverNote: z
      .string({ error: "Cover note is required" })
      .min(5, "Cover note should be at least 5 characters"),
  }),
});
