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
import { Loader2, Paperclip } from "lucide-react";

import { useRouter } from "next/navigation";
import { userSigninRequest } from "@/api/auth";
import { mailSchema } from "@/validation/mail/mail";
import { Textarea } from "../textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mailSendRequest } from "@/api/mail";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

import { trucks } from "@/utils/truck-arrays";

type Props = {};

const SendMail = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [attachment, setAttachment] = React.useState<File | null>(null);

  const form = useForm<z.infer<typeof mailSchema>>({
    resolver: zodResolver(mailSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleClickSignin = async (formValues: z.infer<typeof mailSchema>) => {
    console.log(formValues);

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("subject", formValues.subject);
      formData.append("message", formValues.message);
      if (attachment) {
        formData.append("attachment", attachment);
      }
      setIsLoading(true);
      const request = await mailSendRequest(formData);
      console.log(request);

      const data = await request.json();
      if (data?.success) {
        toast({
          title: "Success",
          description: "Message sent successfully",
          variant: "success",
          duration: 900,
        });
        setIsLoading(false);
      } else {
        toast({
          title: "Failed",
          description: "Error occurred while sending the message",
          variant: "destructive",
          duration: 900,
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error (Server)",
        description: "Message sending failed",
        variant: "destructive",
        duration: 900,
      });
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Truck List", 10, 10);
    trucks.forEach((truck: any, index: any) => {
      doc.text(
        `${truck.name} - ${truck.manufacturer} - ${truck.year}`,
        10,
        20 + index * 10
      );
    });
    doc.save("trucks.pdf");
  };

  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(trucks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trucks");
    XLSX.writeFile(workbook, "trucks.xlsx");
  };

  const handlePrint = () => {
    const printContent = trucks
      .map(
        (truck: any) => `${truck.name} - ${truck.manufacturer} - ${truck.year}`
      )
      .join("\n");
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = `<pre>${printContent}</pre>`;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen gap-2 p-4 pt-0">
      <div className="flex justify-center align-middle h-full items-center">
        <Card className=" h-fit">
          <CardHeader>
            <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Compose Email
              <CardDescription className="mt-1">
                Enter email and click on send.
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
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter subject"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
           
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[220px]"
                          placeholder="Start writing email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Button
                    disabled={isLoading}
                    className="mt-4 w-fit bg-gradient-to-r from-violet-400 to-violet-500 float-end mb-4"
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
    </div>
  );
};

export default SendMail;
