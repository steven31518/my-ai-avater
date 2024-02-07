"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import { CustomFormFieldPassword } from "./FormComponents";
import { Button } from "./ui/button";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./PasswordStrength";
import { useEffect, useState } from "react";
interface Props {
  jwtUserId: string;
}

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 8 characters long")
      .max(20, "Password must be at most 20 characters long"),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type inputType = z.infer<typeof FormSchema>;

export default function ResetPasswordForm({ jwtUserId }: Props) {
  const [passStrength, setPassStrength] = useState(0);
  const form = useForm<inputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const password = form.watch().password;

  function onSubmit(data: inputType) {
    console.log(data);
  }
  useEffect(() => {
    setPassStrength(passwordStrength(password).id);
  }, [password]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 grid grid-rows-subgrid gap-2 rounded place-self-stretch"
      >
        <div className="grid grid-rows-4 grid-flow-col gap-2">
          <h2 className="capitalize font-semibold text-4xl mb-6">
            Reset Your Password
          </h2>
          <div className="space-y-2">
            <CustomFormFieldPassword name="password" control={form.control} />
            <PasswordStrength passStrength={passStrength}></PasswordStrength>
          </div>
          <CustomFormFieldPassword
            name="confirmPassword"
            control={form.control}
          />
          <div className="flex justify-center items-center">
            <Button className="capitalize w-48 self-center my-6">
              Reset Password
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
