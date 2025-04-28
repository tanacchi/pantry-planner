import { ensureConnected, prisma } from "./common.server";

export const getItems = async (userId: number) => {
  await ensureConnected();
  const items = prisma.item.findMany({
    where: { pantry: { userId } },
    orderBy: { createdAt: "desc" },
  });
  return items;
};

export const login = async (lineUid: string) => {
  console.log("logging in", lineUid);
  try {
    await ensureConnected();
    console.log("DB connected");
    const user = await prisma.user.findUnique({
      where: { lineUid },
    });
    if (user) {
      console.log("User found", user);
      user.lastLoginAt = new Date();
      prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: user.lastLoginAt },
      });
      return { user };
    }
    const { user: newUser } = await registerUser(lineUid);
    return { user: newUser };
  } catch (error) {
    console.error("Error in login function:", error);
    throw error;
  }
};

export const registerUser = async (lineUid: string) => {
  const user = await prisma.user.create({
    data: {
      lineUid,
    },
  });
  const pantry = await prisma.pantry.create({
    data: {
      userId: user.id,
    },
  });
  return { user, pantry };
};
