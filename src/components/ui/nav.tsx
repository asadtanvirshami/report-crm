"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import Cookies from "js-cookie";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { Button } from "./button";
import { useRouter } from "next/navigation";
interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    href: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const router = useRouter();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    "h-6 w-full dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-black"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="flex items-center gap-4 text-sm"
              >
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1 font-medium text-muted-foreground text-sm hover:bg-muted hover:text-black"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.variant === "default" &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
              <Button
                onClick={() => {
                  Cookies.remove("token");
                  router.push("/auth/signin");
                }}
                className="mt-5 bg-violet-500 hover:bg-violet-500"
              >
                LOGOUT
              </Button>
            </>
          )
        )}
      </nav>
    </div>
  );
}
