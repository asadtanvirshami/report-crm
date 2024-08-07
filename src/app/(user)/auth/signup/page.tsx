"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import React from "react";
import { registerSchema } from "@/validation/auth/authValidation";

import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { userSignupRequest } from "@/api/auth";

type Props = {};

const Signup = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleClickSignup = async (
    formValues: z.infer<typeof registerSchema>
  ) => {
    console.log(formValues);

    try {
      setIsLoading(true);
      const request = await userSignupRequest(
        formValues.email,
        formValues.password,
        formValues.firstName,
        formValues.lastName
      );
      console.log(request);

      const data = await request.json();
      if (data?.success) {
        toast({
          title: "Success",
          description: "Registration successful",
          variant: "success",
          duration: 900,
        });
        setIsLoading(false);
        router.push("/auth/signin");
      }
      if (!data?.success) {
        toast({
          title: "Failed",
          description: "email already exists.",
          variant: "destructive",
          duration: 900,
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error (Server)",
        description: "Signin failed",
        variant: "destructive",
        duration: 900,
      });
      setIsLoading(false);
    }
  };
  return (
    <div className="flex  bg-gradient-to-r from-violet-400 to-violet-600  h-screen align-middle justify-center items-center bg-white shadow-md">
      <Card className="w-[430px] h-fit">
        <CardHeader>
          <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Sign Up
            <CardDescription className="mt-1">
              Sign up to use report mailing system.
            </CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-2"
              onSubmit={form.handleSubmit(handleClickSignup)}
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>last Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Doe" {...field} />
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
                        type="email"
                        placeholder="example@gmail.com"
                        {...field}
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
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <small className="text-gray-600 mt-3 cursor-pointer">
                  Forgot password?
                </small>
                <small
                  className="text-violet-600 mt-3 cursor-pointer"
                  onClick={() => router.push("/auth/signin")}
                >
                  Already have account? Click here.
                </small>
              </div>
              <div>
                <Button
                  disabled={isLoading}
                  className="mt-4 w-full bg-gradient-to-r from-violet-400 to-violet-500 float-end mb-4"
                  type="submit"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
