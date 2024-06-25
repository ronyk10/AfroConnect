import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

/**
 * @swagger
 * /api/article/{id}/comment:
 *   get:
 *     tags:
 *       - comment
 *     summary: Retrieve comments for an article
 *     description: Fetches all comments for a specific article.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the article
 *     responses:
 *       200:
 *         description: A list of comment objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                     example: "This is a comment."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-06-14T00:00:00.000Z"
 *                   author:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: "author_username"
 *       500:
 *         description: Internal server error
 */
const GET = async (req, { params }) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId: params.id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
};

/**
 * @swagger
 * /api/article/{id}/comment:
 *   post:
 *     tags:
 *       - comment
 *     summary: Create a new comment for an article
 *     description: Creates a new comment for a specific article.
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
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *                 example: "This is a comment."
 *     responses:
 *       200:
 *         description: The created comment object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                   example: "This is a comment."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:00:00.000Z"
 *                 author:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "author_username"
 *       400:
 *         description: Bad request, missing fields
 *       401:
 *         description: Unauthorized, user not logged in
 *       500:
 *         description: Internal server error
 */
const POST = async (req, { params }) => {
  try {
    console.log("Article ID:", params.id);

    // Retrieve and log the request body
    const body = await req.text();
    console.log("Request body:", body);

    // Parse the request body as JSON
    const { content } = JSON.parse(body);
    console.log("Parsed content:", content);

    // Retrieve and log the cookie
    const userCookie = await cookies().get("userAfroConnect")?.value;
    console.log("User cookie:", userCookie);

    const userId = JSON.parse(userCookie)?.id;

    // Check if the user is logged in
    if (!userId) {
      return NextResponse.json(
        { message: "You need to be logged in" },
        { status: 401 },
      );
    }

    // Validate the content
    if (!content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content,
        author: {
          connect: {
            id: userId,
          },
        },
        article: {
          connect: {
            id: params.id,
          },
        },
      },
    });
    const sendComment = await prisma.comment.findUnique({
      where: {
        id: comment.id,
      },
      select: {
        content: true,
        createdAt: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    // Return the created comment
    return NextResponse.json(sendComment);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
};

/**
 * @swagger
 * /api/articles/{id}/comments:
 *   delete:
 *     tags:
 *       - comment
 *     summary: Delete comments for an article
 *     description: Deletes all comments associated with the specified article ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the article
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       200:
 *         description: Comments deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   example: 10
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
const DELETE = async (req, { params }) => {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const comments = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
};

export { POST, GET, DELETE };
