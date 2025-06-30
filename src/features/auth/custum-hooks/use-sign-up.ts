import { auth } from "@firebase";
import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { signUpSchema } from "@/features/schemas";
import { z } from "zod";

type SignUpRequest = z.infer<typeof signUpSchema>;

export const useSignUp = () => {
  const mutation = useMutation<User, Error, SignUpRequest>({
    mutationFn: async ({ name, email, password }) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      return userCredential.user;
    },
  });

  return mutation;
};
