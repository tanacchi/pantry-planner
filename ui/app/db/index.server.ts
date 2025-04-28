import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var __db__: PrismaClient | undefined;
}

function createPrismaClient() {
  return new PrismaClient({
    log: ["info", "warn", "error"], // エラーログを拡充
  });
}

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = createPrismaClient();
  }
  prisma = global.__db__;
}

// ★ ここでコネクションチェックを入れる
async function ensureConnected() {
  try {
    await prisma.$connect();
  } catch (e) {
    console.error("Failed to connect to database", e);
    throw e;
  }
}


export const getItems = async (userId: number) => {
  await ensureConnected();
  const items = prisma.item.findMany({
    where: { pantry: { userId } },
    orderBy: { createdAt: "desc" },
  });
  return items;
}

export { prisma };
