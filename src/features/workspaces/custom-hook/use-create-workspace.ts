import { useAuthContext } from "@/context/auth-context";
import { db } from "@firebase";
import { useMutation } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "sonner";

type RequestType = {
  name: string;
};
type ResponseType = {
  id: string;
  name: string;
  userId: string;
};

export const useCreateWorkspace = () => {
  const { user } = useAuthContext();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ name }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      try {
        const docRef = await addDoc(collection(db, "workspaces"), {
          name,
          userId: user?.uid,
          createdAt: new Date(),
        });
        return {
          id: docRef.id,
          name,
          userId: user.uid,
        };
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    onSuccess: () => {
      toast.success("Workspace created");
    },
    onError: () => {
      toast.error("Failed to create workspace");
    },
  });

  return mutation;
};
