"use server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

const getFirebaseAdmin = () => {
  //すでに初期化済みの場合は既存のアプリを返す。
  if (getApps().length > 0) {
    return getApps()[0];
  }
  return initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
};

export const getCurrent = async () => {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("firebase-token");

    if (!tokenCookie || !tokenCookie.value) {
      return null;
    }

    const app = getFirebaseAdmin();
    const auth = getAuth(app);

    const decodedToken = await auth.verifyIdToken(tokenCookie.value);
    return await auth.getUser(decodedToken.uid);
  } catch (error) {
    console.log(error);
    return null;
  }
};
