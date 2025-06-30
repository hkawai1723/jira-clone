import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export const SignUpCard = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-full md:w-[490px] mt-20">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>
        <div className="px-2">
          <Separator />
        </div>
        <CardContent>
          <SignUpForm />
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
            Do you already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-300">
              Login here.
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
