"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "./FormComponents";
import { CustomFormFieldPassword } from "./FormComponents";
import { CustomFormFieldCheckbox } from "./FormComponents";
import validator from "validator";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./PasswordStrength";
import { api } from "@/app/_trpc/react";
import toast from "react-hot-toast";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(20, { message: "First name must be less than 20 characters" })
      .regex(new RegExp("^[a-zA-Z]+$"), {
        message: "First name must be letters only",
      }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(20, { message: "Last name must be less than 20 characters" })
      .regex(new RegExp("^[a-zA-Z]+$"), {
        message: "last name must be letters only",
      }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must be less than 20 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must be less than 20 characters" }),
    phoneNumber: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number"),
    acceptTerms: z.literal(true, {
      errorMap: () => ({
        message: "Please accept terms",
      }),
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom", //z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
// .refine(
//   (data) => {
//     return data.password === data.confirmPassword;
//   },
//   {
//     message: "Passwords and confirmPassword do not match",
//     path: ["confirmPassword"],
//   }
// );

export default function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const password = form.watch().password;

  const [passStrength, setPassStrength] = useState(0);

  const { isPending, mutate } = api.auth.register.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { acceptTerms, confirmPassword, ...user } = data;
    mutate(user);
  }

  useEffect(() => {
    setPassStrength(passwordStrength(password).id);
  }, [password]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded place-self-stretch"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">Sign Up</h2>
        <div className="grid gap-4 lg:grid-cols-2 items-start">
          <CustomFormField name="firstName" control={form.control} />
          <CustomFormField name="lastName" control={form.control} />
          <CustomFormField name="email" control={form.control} />
          <CustomFormField name="phoneNumber" control={form.control} />
          <div className="space-y-2">
            <CustomFormFieldPassword name="password" control={form.control} />
            <PasswordStrength passStrength={passStrength}></PasswordStrength>
          </div>
          <CustomFormFieldPassword
            name="confirmPassword"
            control={form.control}
          />
          <div className="lg:col-span-2">
            <CustomFormFieldCheckbox
              name="acceptTerms"
              control={form.control}
            />
          </div>
          <div className="flex justify-center lg:col-span-2">
            <Button
              type="submit"
              className="capitalize w-48"
              disabled={isPending}
            >
              {isPending ? "Signing up..." : "Sign Up"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
