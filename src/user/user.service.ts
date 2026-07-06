import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import type { RegisterUser } from "./user.interface";
import config from "../config";

const registerUserIntoDB = async (payload: RegisterUser) => {
  const { name, email, password, profilePhoto, role } = payload;

  const isUserExit = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExit) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createUser.id,
      email: createUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

export const userSerivce = {
  registerUserIntoDB,
};
