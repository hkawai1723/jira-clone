import React from "react";

import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

const page = async () => {
  const user = await getCurrent();
  if (!user) redirect("/login");
  return (
    <div className="bg-neutral-500 p-4">
      <CreateWorkspaceForm />
    </div>
  );
};

export default page;
