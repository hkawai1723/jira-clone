import { useAuthContext } from "@/context/auth-context";
import { db } from "@firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type WorkspaceType = {
  id: string;
  name: string;
  inviteCode: string;
};

export const useGetWorkspaces = () => {
  const { user } = useAuthContext();
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const membersCollectionRef = collection(db, "members");
    const q = query(membersCollectionRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (!snapshot) {
        return;
      }

      const workspacePromises = snapshot.docs.map(async (memberDoc) => {
        const workspaceId = memberDoc.data().workspaceId;
        console.log("workspace ID", workspaceId);
        const workspace = await getDoc(doc(db, "workspaces", workspaceId));
        console.log("workspace Data", workspace.data());

        return {
          id: workspaceId,
          name: workspace.data()?.name,
          inviteCode: workspace.data()?.inviteCode,
        };
      });

      const workspaceList = await Promise.all(workspacePromises);
      setWorkspaces(workspaceList);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);
  console.log("workspace list", workspaces);
  return { workspaces };
};
