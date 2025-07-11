import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const user = await getCurrent();
  if (user) redirect("/dashboard");
  return <SignUpCard />;
};

export default SignUp;
