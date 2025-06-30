import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoginForm } from "@/features/auth/components/login-form";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export const LoginCard = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-full md:w-[490px] mt-20">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <div className="px-2">
          <Separator />
        </div>
        <CardContent>
          <LoginForm />
        </CardContent>
        <div className="px-2">
          <Separator />
        </div>
        <CardContent className="flex justify-center">
          <Button size="lg" variant="outline">
            <FcGoogle />
            Login with google
          </Button>
        </CardContent>
        <div className="px-2">
          <Separator />
        </div>
        <CardContent className="flex justify-center">
          <p>
            Are you new here?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:text-blue-300">
              Sing up here.
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
