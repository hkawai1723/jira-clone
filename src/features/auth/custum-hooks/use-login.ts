import { auth } from "@firebase";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { loginSchema } from "@/features/schemas";
import { z } from "zod";

type LoginRequest = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const mutation = useMutation<User, Error, LoginRequest>({
    mutationFn: async ({ email, password }) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user;
    },
  });

  return mutation;
};
