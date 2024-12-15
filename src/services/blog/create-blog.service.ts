import { Blog } from "@prisma/client";
import prisma from "../../lib/prisma";
import { cloudinaryUpload } from "../../lib/cloudinary";

interface CreateBlogBody {
  title: string;
  description: string;
  content: string;
  category: string;
}

export const createBlogService = async (
  body: CreateBlogBody,
  thumbnail: Express.Multer.File,
  userId: number
) => {
  try {
    const { title } = body;

    const blog = await prisma.blog.findFirst({
      where: { title },
    });

    if (blog) {
      throw new Error("Title already in use");
    }

    const { secure_url } = await cloudinaryUpload(thumbnail);

    return await prisma.blog.create({
      data: {
        ...body,
        thumbnail: secure_url,
        userId,
      },
    });
  } catch (error) {
    throw error;
  }
};
