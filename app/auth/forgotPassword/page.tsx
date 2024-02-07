"use client";

import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField } from "@/components/FormComponents";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/app/_trpc/react";
import toast from "react-hot-toast";
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type inputType = z.infer<typeof FormSchema>;
export default function ForgotPasswordPage() {
  const form = useForm<inputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  const { isPending, mutate } = api.auth.forgotPassword.useMutation({
    onError(err) {
      toast.error(err.message);
    },
    onSuccess() {
      toast.success("Email sent successfully");
    },
    onSettled() {
      form.reset();
    },
  });
  function onSubmit(data: inputType) {
    mutate(data.email);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-3">
      <div className="md:col-span-2 flex justify-center items-center">
        <p className="text-center p-2 capitalize">Forgot your password?</p>
        <Link
          href={"/auth/signin"}
          className="text-sky-500 hover:text-sky-600 transition-colors"
        >
          Sign In
        </Link>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-muted p-8 grid grid-rows-subgrid gap-2 rounded place-self-stretch"
        >
          <div className="grid grid-rows-4 grid-flow-col gap-4">
            <h2 className="capitalize font-semibold text-4xl mb-6">
              Reset Password
            </h2>
            <div className="text-muted-foreground">
              <ol>
                <li>
                  1. Please enter your account email, system will send mail to
                  reset.
                </li>
                <li>2. Check your email to verify.</li>
                <li>3. Reset your password.</li>
              </ol>
            </div>
            <CustomFormField name="email" control={form.control} />
            <div className="flex justify-center items-center">
              <Button
                variant={"default"}
                disabled={isPending}
                className="capitalize w-48 self-center my-6"
              >
                {isPending ? "sending" : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <Image
        src="/forgot-password.png"
        alt="forgot password"
        width={500}
        height={500}
      ></Image>
    </div>
  );
}
