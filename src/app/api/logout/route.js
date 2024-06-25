import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/logout:
 *   get:
 *     tags:
 *       - authentication
 *     summary: Log out user
 *     description: Logs out the user by deleting the userAfroConnect cookie.
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out"
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
const GET = async (req) => {
  cookies().delete("userAfroConnect");
  return NextResponse.json({ message: "Logged out" });
};
export { GET };
