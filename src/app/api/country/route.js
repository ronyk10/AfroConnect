import { NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import { prisma } from "@/lib/prisma";
import process from "node:process";

/**
 * @swagger
 * /api/country:
 *   get:
 *     tags:
 *       - country
 *     summary: Get all countries
 *     description: Retrieves a list of all countries.
 *     responses:
 *       200:
 *         description: A list of countries
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
 *                   name:
 *                     type: string
 *                     example: "Country Name"
 *       500:
 *         description: Internal server error
 */
const GET = async (req, res) => {
  //const countries = await prisma.country.findMany();
  const countries = await prisma.country.findMany({});
  return NextResponse.json(countries);
};

/**
 * @swagger
 * /api/country:
 *   post:
 *     tags:
 *       - country
 *     summary: Create all countries if not exists from JSON file
 *     description: Creates countries in the database based on data from a JSON file.
 *     responses:
 *       200:
 *         description: Success message
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
 *                   example: "Countries created successfully"
 *       500:
 *         description: Internal server error
 */
const POST = async (req, res) => {
  const countries = await readFileSync(
    process.cwd() + "/src/data/countries.json",
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      return data;
    },
  );
  for (const countryName of Object.values(JSON.parse(countries))) {
    const alreadyExists = await prisma.country.findFirst({
      where: {
        name: countryName,
      },
    });
    if (alreadyExists) {
      continue;
    }
    await prisma.country.create({
      data: {
        name: countryName,
      },
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Countries created successfully",
  });
};
export { GET, POST };
