import type { Prisma } from "../generated/prisma/client";

interface JobQuery {
  search?: string;
  location?: string;
  category?: string;
  page?: string | number;
  limit?: string | number;
  sortBy?: keyof Prisma.JobOrderByWithRelationInput;
  order?: "asc" | "desc";
}

export const buildQuery = (query: JobQuery) => {
  const where: Prisma.JobWhereInput = {};

  if (query.search) {
    where.OR = [
      { title: { contains: query.search, mode: "insensitive" } },
      { company: { contains: query.search, mode: "insensitive" } },
    ];
  }

  if (query.location) where.location = query.location;
  if (query.category) where.category = query.category;

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const orderBy: Prisma.JobOrderByWithRelationInput = query.sortBy
    ? { [query.sortBy]: query.order === "asc" ? "asc" : "desc" }
    : { createdAt: "desc" };

  return { where, skip, take: limit, orderBy };
};
