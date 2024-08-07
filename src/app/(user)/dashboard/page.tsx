import React from "react";
import { cookies } from "next/headers";
import { ParsedUrlQuery } from "querystring";
import { PreviewData } from "next";

interface SessionData {
  success: boolean;
  // Add other session data properties if needed
}

import { Mail } from "@/components/ui/mail/mail";
import { accounts, mails } from "@/data/data";
import { GetServerSideProps } from "next";
import { userVerification } from "@/api/auth";

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout:mail");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;


  return (
    <>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
