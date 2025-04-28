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
  let count = 0;
  console.log("logging in", lineUid);
  try {
    count++;
    await ensureConnected();
    count++;
    console.log("DB connected");
    const user = await prisma.user.findUnique({
      where: { lineUid },
    });
    count++;

    if (user) {
      console.log("User found", user);
      user.lastLoginAt = new Date();
      prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: user.lastLoginAt },
      });
      count++;
      return { user };
    }
    count += 100;
    const { user: newUser } = await registerUser(lineUid);
    count++;
    return { user: newUser };
  } catch (error) {
    console.error("Error in login function:", error);
    throw new Error(`Error in login function: ${JSON.stringify(error)}---${count}`);
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
