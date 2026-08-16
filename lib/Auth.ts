import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import * as Sentry from "@sentry/nextjs";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const cookieName = "auth-token";

// Encrypt and signing token
export async function signAuthToken(payload: any) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({
        alg: "HS256 ",
      })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    return token;
  } catch (error) {
    Sentry.addBreadcrumb({
      message: "Token Sign in failed",
      category: "auth ",
      level: "error",
      data: { payload },
    });
    throw new Error("Token Sign In Failed");
  }
}

// decrypt and verify token

export async function verifyAuthToken<T>(token: string): Promise<T> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as T;
  } catch (error) {
    Sentry.addBreadcrumb({
      message: "Token Decryption failed",
      category: "auth",
      level: "error",
      data: {
        tokenSnippet: token.slice(0, 10),
      },
    });
    Sentry.captureException(error);
    throw new Error("Token decryption failed");
  }
}

// Set the auth cookie
export async function setAuthCookie(token: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(cookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 Days
    });
  } catch (error) {
    // logEvent('Failed to set cookie', 'auth', { token }, 'error', error);
    Sentry.addBreadcrumb({
      message: "Failed to set cookie",
      category: "auth",
      level: "error",
      data: {
        token,
      },
    });
    Sentry.captureException(error);
  }
}

// Get auth token from cookie
export async function getAuthCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName);
  return token?.value;
}

// set the auth cookie
export async function removeAuthCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(cookieName);
  } catch (error) {
    Sentry.addBreadcrumb({
      message: "Failed to remove the auth cookie",
      category: "auth",
      data: {},
    });
    Sentry.captureException(error);
  }
}
