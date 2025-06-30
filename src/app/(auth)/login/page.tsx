import React from "react";
import { LoginCard } from "@/features/auth/components/login-card";
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const Login = async () => {
  const user = await getCurrent();
  if (user) redirect("/dashboard");

  return <LoginCard />;
};

export default Login;
