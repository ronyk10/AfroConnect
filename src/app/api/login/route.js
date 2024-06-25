import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


/**
 * @swagger
 * /api/login:
 *   get:
 *     tags:
 *       - authentication
 *     summary: Get user information
 *     description: Retrieves user information if logged in.
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: User information
 *                   example: {}
 *       400:
 *         description: No user logged in
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
 *                   example: "User not logged in"
 *       500:
 *         description: Internal server error
 */

const GET = async (req, res) => {
  return NextResponse.json(
    {
      user: (await cookies().get("userAfroConnect")?.value) ?? {},
    },
    { status: cookies().get("userAfroConnect") ? 200 : 400 },
  );
};

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - authentication
 *     summary: User login
 *     description: Logs in a user with provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged in successfully"
 *       400:
 *         description: Bad request, missing or incorrect credentials
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
 *                   example: "User not found"
 *       401:
 *         description: Unauthorized, invalid password
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
 *                   example: "Invalid password"
 *       500:
 *         description: Internal server error
 */
const POST = async (req, res) => {
  const { email, password } = await req.json();
  if (!email || !password) {
    return res.send({ status: 400, message: "Please provide all the details" });
  }

  // Find the user with the email
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Invalid password" }, { status: 400 });
  }
  delete user.password;
  await cookies().set("userAfroConnect", JSON.stringify(user));
  return NextResponse.json({ message: "Logged in successfully" });
};



export { POST, GET };
