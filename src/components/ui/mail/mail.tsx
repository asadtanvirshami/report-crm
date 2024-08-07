"use client";

import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  Contact2,
  File,
  Inbox,
  LogOut,
  MessagesSquare,
  Search,
  Send,
  Settings2,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "../input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../resizable";
import { Separator } from "../separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { TooltipProvider } from "../tooltip";
import TruckList from "@/components/ui/mail/mail-list";
import { Nav } from "@/components/ui/nav";
import { type Mail } from "@/data/data";
import { useMail } from "@/app/jotai/atoms/mail-atom";
import SendMail from "./mail-display";
import { userVerification } from "@/api/auth";
import { useRouter } from "next/navigation";
import { trucks } from "@/utils/truck-arrays";
import UploadBar from "./upload-bar";
interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();
  const router = useRouter();

  async function sessionVerify() {
    const response: any = await userVerification();
    console.log(response);
    if (!response.isAuthorized) {
      router.push("/auth/signin");
    }
  }

  React.useEffect(() => {
    sessionVerify();
  }, []);
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[100vh] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={12}
          maxSize={13}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            {/* <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} /> */}
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Dashboard",
                href: "/dashboard",
                icon: Contact2,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div defaultValue="all h-full">
            <div className="flex items-center px-4 py-3 ">
              <h1 className="text-xl font-bold">Mail Dashboard</h1>
            </div>
            <TruckList items={trucks} />
          </div>
          <Separator />
          <div className="mt-3"></div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <SendMail />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
