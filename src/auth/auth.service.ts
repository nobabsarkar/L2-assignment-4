import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import type { ILoginUser } from "./auth.interface";

const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  if (user.status === "BLOCKED") {
    throw new Error("Your account has been blocked.");
  }

  const isPasswordMatched = await bcrypt.compare(password, user?.password);
  if (!isPasswordMatched) {
    throw new Error("Password is not matched.");
  }
};

export const authService = {
  loginUserIntoDB,
};
