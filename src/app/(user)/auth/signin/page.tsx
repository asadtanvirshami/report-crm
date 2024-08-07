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
import { authSchema } from "@/validation/auth/authValidation";

import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { userSigninRequest } from "@/api/auth";
import Cookies from "js-cookie";

type Props = {
  setIsSignUp: (active: boolean) => void;
};

const Signin = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClickSignin = async (formValues: z.infer<typeof authSchema>) => {
    console.log(formValues);

    try {
      setIsLoading(true);
      const request = await userSigninRequest(
        formValues.email,
        formValues.password
      );
      console.log(request);

      const data = await request.json();
      console.log(data);
      
      if (data?.success) {
        Cookies.set("token", data?.data.token);
        toast({
          title: "Success",
          description: "Signin successful",
          variant: "success",
          duration: 900,
        });
        setIsLoading(false);
        router.push("/dashboard");
      }
      if (!data?.success) {
        toast({
          title: "Failed",
          description: "email or password might be incorrect",
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
            Signin
            <CardDescription className="mt-1">
              Sign in to use report mailing system.
            </CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-2"
              onSubmit={form.handleSubmit(handleClickSignin)}
            >
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
                  onClick={() => router.push("/auth/signup")}
                >
                  Register here.
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

export default Signin;
