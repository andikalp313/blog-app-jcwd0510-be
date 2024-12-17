import { Prisma } from "@prisma/client";

import { PaginationQueryParams } from "../../types/pagination";
import prisma from "../../lib/prisma";

interface GetBlogQuery extends PaginationQueryParams {
  search: string;
}

export const getBlogsService = async (query: GetBlogQuery) => {
  try {
    const { page, sortBy, sortOrder, take, search } = query;

    const whereClause: Prisma.BlogWhereInput = {
      deletedAt: null,
    };

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where: whereClause,
      skip: (page - 1) * take, //offset
      take: take, //limit
      orderBy: { [sortBy]: sortOrder }, // sorting
      include: { user: { select: { name: true } } },
    });

    const count = await prisma.blog.count({ where: whereClause });

    return {
      data: blogs,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
