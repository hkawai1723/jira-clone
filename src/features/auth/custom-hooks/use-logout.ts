import { auth } from "@firebase";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const mutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await signOut(auth);
      router.push("/login");
    },
    onSuccess: () => {
      toast.success("Logged out");
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });

  return mutation;
};
