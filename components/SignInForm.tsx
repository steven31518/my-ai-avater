"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "./FormComponents";
import { CustomFormFieldPassword } from "./FormComponents";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type InputType = z.infer<typeof FormSchema>;

export default function SignInForm(props: Props) {
  const router = useRouter();
  const form = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: InputType) {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error as string);
      return;
    }
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">Sign In</h2>
        <div className="flex flex-col gap-2">
          <CustomFormField name="email" control={form.control} />
          <CustomFormFieldPassword name="password" control={form.control} />
          <div className="flex items-center justify-center my-6">
            <Button
              type="submit"
              className="capitalize w-48"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
            <Link href={"/auth/signup"}>
              <Button variant={"link"} className="capitalize w-48">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
