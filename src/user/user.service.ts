import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import type { RegisterUser } from "./user.interface";
import config from "../config";
import { Role } from "../../generated/prisma/enums";

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

const getMyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

const getAllUsersFromDB = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: {
        in: [Role.LANDLORD, Role.TENANT],
      },
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return users;
};

export const userSerivce = {
  registerUserIntoDB,
  getMyProfileFromDB,
  getAllUsersFromDB,
};
