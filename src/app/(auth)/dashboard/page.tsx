import React from "react";
import { UserButton } from "@/features/auth/components/user-button";
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrent();
  if (!user) redirect("/login");
  return <div>Hello</div>;
};

export default page;
