"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const LoginForm = () => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const CALLBACK_URL = "/";

  const validateForm = (values: { email: string; password: string }) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const handleSubmit = async (
    values: {
      email: string;
      password: string;
    },
    { setSubmitting }: any
  ) => {
    setLoading(true);
    const { email, password } = values;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: CALLBACK_URL,
      });
      if (!res) {
        throw new Error("Sign-in response is missing or invalid.");
      } else if (res.error) {
        throw new Error(res.error);
      } else {
        router.push(CALLBACK_URL);
      }
    } catch (error: any) {
      setSubmitting(false);
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3 items-start max-w-xs w-full">
            <Field
              className="border border-secondary p-3 bg-transparent outline-none w-full rounded-sm"
              placeholder="Please enter your email..."
              type="email"
              name="email"
            />
            <ErrorMessage name="email" component="div" />
            <Field
              className="border border-secondary p-3 bg-transparent outline-none w-full rounded-sm"
              placeholder="Please enter your password..."
              type="password"
              name="password"
            />
            <ErrorMessage name="password" component="div" />
            <Button type="submit" disabled={isSubmitting}>
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
