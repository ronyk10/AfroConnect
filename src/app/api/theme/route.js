import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


/**
 * @swagger
 * /api/theme:
 *   get:
 *     tags:
 *       - theme
 *     summary: Get all themes
 *     description: Retrieves a list of all themes.
 *     responses:
 *       200:
 *         description: A list of themes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   name:
 *                     type: string
 *                     example: "Dark Mode"
 *       500:
 *         description: Internal server error
 */
const GET = async (req, res) => {
  const themes = await prisma.theme.findMany();
  return NextResponse.json(themes);
};


/**
 * @swagger
 * /api/theme:
 *   post:
 *     tags:
 *       - theme
 *     summary: Create a new theme
 *     description: Creates a new theme with the provided name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Foutou Banane"
 *     responses:
 *       200:
 *         description: Theme created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Theme created successfully"
 *       400:
 *         description: Bad request, missing theme name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Please provide all the details"
 *       500:
 *         description: Internal server error
 */

const POST = async (req, res) => {
  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({
      status: 400,
      message: "Please provide all the details",
    });
  }

  // Save the theme to database
  await prisma.theme.create({
    data: {
      name,
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Theme created successfully",
  });
};


export { POST, GET };
