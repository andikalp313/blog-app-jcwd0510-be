import prisma from "../../lib/prisma";

export const getBlogService = async (id: number) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { user: { select: { name: true } } },
    });
    if (!blog) {
      throw new Error("Invalid blog id");
    }
    return blog;
  } catch (error) {
    throw error;
  }
};
