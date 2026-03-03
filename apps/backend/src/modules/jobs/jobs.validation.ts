import { z } from "zod";

export const createJobSchema = z.object({
  body: z.object({
    title: z
      .string({ error: "Title is required" })
      .min(3, "Title should be at least 3 characters"),
    company: z
      .string({ error: "Company is required" })
      .min(2, "Company required"),
    location: z
      .string({ error: "Location is required" })
      .min(2, "Location required"),
    category: z
      .string({ error: "Category is required" })
      .min(2, "Category required"),
    description: z
      .string({ error: "Description is required" })
      .min(10, "Description should be at least 10 characters"),
  }),
});
