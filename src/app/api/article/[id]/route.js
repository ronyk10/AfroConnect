import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/article/{id}:
 *   get:
 *     tags:
 *       - article
 *     summary: Retrieve a single article by ID
 *     description: Fetches an article by its ID, including its author, theme, and country details.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the article
 *     responses:
 *       200:
 *         description: The article object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *
 *                   example: "clx7jui4900032upurk6dsf7w"
 *                 title:
 *                   type: string
 *                   example: "Article Title"
 *                 content:
 *                   type: string
 *                   example: "Article content"
 *                 imageURL:
 *                   type: string
 *                   example: "https://example.com/image.jpg"
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "clx7jui4900032upurk6dsf7w"
 *                     username:
 *                       type: string
 *                       example: "author_username"
 *                 theme:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "clx7jui4900032upurk6dsf7w"
 *                     name:
 *                       type: string
 *                       example: "Theme Name"
 *                 country:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "clx7jui4900032upurk6dsf7w"
 *                     name:
 *                       type: string
 *                       example: "Country Name"
 *       404:
 *         description: Article not found
 */
const GET = async (req, { params }) => {
  const articles = await prisma.article.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      imageURL: true,
      legend: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      theme: {
        select: {
          id: true,
          name: true,
        },
      },
      country: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return NextResponse.json(articles);
};

/**
 * @swagger
 * /api/article/{id}:
 *   delete:
 *     tags:
 *       - article
 *     summary: Delete an article by ID
 *     description: Deletes an article by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the article
 *     responses:
 *       200:
 *         description: A message indicating the article was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article deleted"
 *       404:
 *         description: Article not found
 */
const DELETE = async (req, { params }) => {
  console.log(params.id);
  await prisma.article.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ message: "Article deleted" });
};

/**
 * @swagger
 * /api/article/{id}:
 *   put:
 *     tags:
 *       - article
 *     summary: Update an article by ID
 *     description: Updates an article's details by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *
 *                 example: "Updated Title"
 *               content:
 *                 type: string
 *                 example: "Updated content"
 *               imageURL:
 *                 type: string
 *                 example: "https://example.com/updated-image.jpg"
 *               countryId:
 *                 type: string
 *                 example: "clx7jui4900032upurk6dsf7w"
 *               themeId:
 *                 type: string
 *                 example: "clx7jui4900032upurk6dsf7w"
 *     responses:
 *       200:
 *         description: The updated article object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "clx7jui4900032upurk6dsf7w"
 *                 title:
 *                   type: string
 *                   example: "Updated Title"
 *                 content:
 *                   type: string
 *                   example: "Updated content"
 *                 imageURL:
 *                   type: string
 *                   example: "https://example.com/updated-image.jpg"
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "clx7jui4900032upurk6dsf7w"
 *                     username:
 *                       type: string
 *                       example: "author_username"
 *                 theme:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "clx7jui4900032upurk6dsf7w"
 *                     name:
 *                       type: string
 *                       example: "Theme Name"
 *                 country:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "clx7jui4900032upurk6dsf7w"
 *                     name:
 *                       type: string
 *                       example: "Country Name"
 *       400:
 *         description: Bad request, missing required fields
 *       404:
 *         description: Article not found
 */
const PUT = async (req, { params }) => {
  const { title, content, imageURL, countryId, themeId } = await req.json();
  if (!title || !content || !imageURL || !countryId || !themeId)
    return NextResponse.json(
      { message: "Please provide all the details" },
      { status: 400 },
    );

  const article = await prisma.article.update({
    where: {
      id: params.id,
    },
    data: {
      title,
      content,
      imageURL,
      country: {
        connect: {
          id: countryId,
        },
      },
      theme: {
        connect: {
          id: themeId,
        },
      },
    },
  });
  return NextResponse.json(article);
};

export { DELETE, GET, PUT };
