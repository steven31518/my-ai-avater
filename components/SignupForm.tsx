"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "./FormComponents";
import validator from "validator";
import { useEffect, useState } from "react";
import { passwordStrength } from "check-password-strength";

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
      .max(8, { message: "Password must be less than 8 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(8, { message: "Password must be less than 8 characters" }),
    phoneNumber: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password and confirm password must match",
    path: ["password", "confirmPassword"],
  });

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

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { confirmPassword, ...signupData } = data;
    console.log(signupData);
  }

  useEffect(() => {
    setPassStrength(passwordStrength(password).id);
  }, [password]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">Sign Up</h2>
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <CustomFormField name="firstName" control={form.control} />
          <CustomFormField name="lastName" control={form.control} />
          <CustomFormField name="email" control={form.control} />
          <CustomFormField name="phoneNumber" control={form.control} />
          <CustomFormField
            name="password"
            control={form.control}
            type="password"
          />
          <CustomFormField
            name="confirmPassword"
            control={form.control}
            type="password"
          />
          <Button type="submit" className="col-start-2 capitalize">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
