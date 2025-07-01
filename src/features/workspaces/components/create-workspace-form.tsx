"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createWorkspaceSchema } from "@/features/schemas";
import { useCreateWorkspace } from "@/features/workspaces/custom-hook/use-create-workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { ImageIcon } from "lucide-react";
// import Image from "next/image";
// import { useRef } from "react";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

type WorkspaceSchemaType = z.infer<typeof createWorkspaceSchema>;

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate, isPending } = useCreateWorkspace();
  //   const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<WorkspaceSchemaType>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       form.setValue("image", file);
  //       // フォームの値を確認
  //     }
  //   };

  const onSubmit = (data: WorkspaceSchemaType) => {
    const payload: { name: string; image?: File | string } = {
      name: data.name,
    };

    // 画像が選択されている場合のみimageプロパティを追加
    if (data.image && data.image instanceof File) {
      payload.image = data.image;
    }

    mutate(payload, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Card className="w-full h-full border-none shadow-none ">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new workspace
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2">Workspace name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter workspace name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              alt="logo"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG or JPEG.
                          </p>
                          <FormControl>
                            <input
                              className="hidden"
                              type="file"
                              accept="image/jpeg,image/png,image/jpg,image/svg+xml"
                              ref={inputRef}
                              disabled={isPending}
                              onChange={handleImageChange}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            disabled={isPending}
                            variant="outline"
                            size="xs"
                            className="w-fit mt-2"
                            onClick={() => inputRef.current?.click()}
                          >
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <Separator />
              <div className="flex items-center justify-between">
                <Button disabled={isPending}>
                  {isPending ? "Creating..." : "Create workspace"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
