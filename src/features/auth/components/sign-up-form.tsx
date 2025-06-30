"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/features/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useSignUp } from "@/features/auth/custum-hooks/use-sign-up";

type signUpSchemaType = z.infer<typeof signUpSchema>;

const DEFAULT_VALUES: signUpSchemaType = {
  name: "",
  email: "",
  password: "",
};

export const SignUpForm = () => {
  const form = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const router = useRouter();
  const signUpMutation = useSignUp();

  const onSubmit = (data: signUpSchemaType) => {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (error) => {
        alert(error);
        console.dir(error);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter your name." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter password."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={signUpMutation.isPending} size="lg">
          {signUpMutation.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "SignUp"
          )}
        </Button>
      </form>
    </Form>
  );
};
