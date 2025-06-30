import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { auth } from "@firebase";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const mutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await signOut(auth);
      router.push("/login");
    },
  });

  return mutation;
};
