const {PrismaClient} = require("@prisma/client");

const globalForPrisma = globalThis
const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
    });

exports.prisma = prisma;
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

exports.prisma = prisma;