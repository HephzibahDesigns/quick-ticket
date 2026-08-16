"use server";

import { prisma } from "./../lib/prisma";
import bcrypt from "bcryptjs";
import { signAuthToken, setAuthCookie } from "@/lib/Auth";

type ResponseResult = {
  success: boolean;
  message: string;
};

// export async function registerUser(prevState, formData: FormData) {}
