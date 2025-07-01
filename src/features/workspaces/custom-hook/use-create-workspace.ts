import { useAuthContext } from "@/context/auth-context";
import { db } from "@firebase";
import { useMutation } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "sonner";
import { uploadImage } from "@/lib/storage";
import { MemberRole } from "@/features/members/types";
import { generateInviteCode } from "@/lib/utils";

type RequestType = {
  name: string;
  image?: File | string;
};
type ResponseType = {
  id: string;
  name: string;
  userId: string;
  imageUrl?: string;
  inviteCode: string;
};

export const useCreateWorkspace = () => {
  const { user } = useAuthContext();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ name, image }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      let imageUrl: string | undefined;
      if (image && image instanceof File) {
        const imagePath = `workspace/${user.uid}/${Date.now()}-${image.name}`;
        imageUrl = await uploadImage(image, imagePath);
      } else if (image && typeof image === "string") {
        imageUrl = image;
      }
      try {
        // undefined値を除外するためのデータオブジェクトを作成
        const inviteCode = generateInviteCode(10);
        const workspaceData: {
          name: string;
          userId: string;
          createdAt: Date;
          imageUrl?: string;
          inviteCode: string;
        } = {
          name,
          userId: user.uid,
          createdAt: new Date(),
          inviteCode: inviteCode,
        };

        // imageUrlがundefinedでない場合のみ追加
        if (imageUrl) {
          workspaceData.imageUrl = imageUrl;
        }

        const docRef = await addDoc(
          collection(db, "workspaces"),
          workspaceData,
        );

        const result = {
          id: docRef.id,
          name,
          userId: user.uid,
          inviteCode: inviteCode,
          imageUrl,
        };

        return result;
      } catch (e) {
        console.error("Failed to create workspace:", e);
        throw e;
      }
    },
    onSuccess: async (data) => {
      try {
        toast.success("Workspace created");
        const newMember = {
          workspaceId: data.id,
          userId: user?.uid,
          role: MemberRole.ADMIN,
        };

        await addDoc(collection(db, "members"), newMember);
      } catch (error) {
        console.error("Failed to create member:", error);
        toast.error("Workspace created, but failed to add member");
      }
    },
    onError: () => {
      toast.error("Failed to create workspace");
    },
  });

  return mutation;
};
