import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";



/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - authentication
 *     summary: Register a new user
 *     description: Registers a new user with username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User registered successfully
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
 *                   example: "User registered successfully"
 *       400:
 *         description: Bad request, missing required fields
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
  const { username, email, password } = await req.json();
  if (!username || !email || !password) {
    return NextResponse.json({
      status: 400,
      message: "Please provide all the details",
    });
  }

  // Save the user to database
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      email,
      role: "USER",
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    status: 200,
    message: "User registered successfully",
  });
};

export { POST };
