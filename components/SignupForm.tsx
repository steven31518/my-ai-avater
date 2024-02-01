"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "./FormComponents";
import validator from "validator";

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
    phoneNumber: z.string().refine((val) => val.length === 10, {
      message: "Phone number must be 10 digits",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
        path: ["confirmPassword"],
      });
    }
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

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { confirmPassword, ...signupData } = data;
    console.log(signupData);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">Sign Up</h2>
        <div className="grid gap-4 md:grid-cols-2 items-start">
          {/* position */}
          <CustomFormField name="firstName" control={form.control} />
          {/* company */}
          <CustomFormField name="lastName" control={form.control} />
          {/* location */}
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
          <Button type="submit" className="col-start-2capitalize">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
