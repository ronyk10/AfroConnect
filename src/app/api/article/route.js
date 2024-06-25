import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/article:
 *   get:
 *     order: 1
 *     tags:
 *       - article
 *     summary: Retrieve all articles
 *     description: Fetches all articles along with their details including author, theme, and country.
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "clx7jui4900032upurk6dsf7w"
 *                   title:
 *                     type: string
 *                     example: "Article Title"
 *                   content:
 *                     type: string
 *                     example: "Article content"
 *                   imageURL:
 *                     type: string
 *                     example: "https://example.com/image.jpg"
 *                   author:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: "author_username"
 *                   theme:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "clx7jui4900032upurk6dsf7w"
 *                       name:
 *                         type: string
 *                         example: "Theme Name"
 *                   country:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "clx7jui4900032upurk6dsf7w"
 *                       name:
 *                         type: string
 *                         example: "Country Name"
 *       500:
 *         description: Internal server error
 */

const GET = async (req, res) => {
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      imageURL: true,
      author: {
        select: {
          username: true,
        },
      },
      theme: {
        select: {
          name: true,
          id: true,
        },
      },
      country: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  return NextResponse.json(articles);
};

/**
 * @swagger
 * /api/article:
 *   post:
 *     tags:
 *       - article
 *     summary: Create a new article
 *     description: Creates a new article with the provided details. The user must be logged in to create an article.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the article
 *                 example: "New Article Title"
 *               content:
 *                 type: string
 *                 description: The content of the article
 *                 example: "New article content."
 *               imageURL:
 *                 type: string
 *                 description: The URL of the article's image
 *                 example: "https://example.com/new-image.jpg"
 *               countryId:
 *                 type: string
 *                 description: The ID of the country
 *                 example: "clx7jui4900032upurk6dsf7w"
 *               themeId:
 *                 type: string
 *                 description: The ID of the theme
 *                 example: "1"
 *     responses:
 *       200:
 *         description: The created article object
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
 *                   example: "New Article Title"
 *                 content:
 *                   type: string
 *                   example: "New article content."
 *                 imageURL:
 *                   type: string
 *                   example: "https://example.com/new-image.jpg"
 *                 author:
 *                   type: object
 *                   properties:
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
 *                       example: "1"
 *                     name:
 *                       type: string
 *                       example: "Country Name"
 *       400:
 *         description: Bad request, missing required fields
 *       401:
 *         description: Unauthorized, user not logged in
 *       500:
 *         description: Internal server error
 */
const POST = async (req, res) => {
  if (!(await cookies().get("userAfroConnect")?.value)) {
    return NextResponse.json(
      { message: "You need to be logged in" },
      { status: 401 },
    );
  }
  const { title, content, imageURL, countryId, themeId, legend } = await req.json();
  if (!title || !content || !imageURL || !countryId || !themeId || !legend)
    return NextResponse.json(
      { message: "Please provide all the details" },
      { status: 400 },
    );

  const article = await prisma.article.create({
    data: {
      title,
      content,
      imageURL,
      legend,
      author: {
        connect: {
          id: JSON.parse(await cookies().get("userAfroConnect")?.value).id,
        },
      },
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


export { GET, POST };
