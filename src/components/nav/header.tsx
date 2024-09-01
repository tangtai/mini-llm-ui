"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Bot, Sun, Moon, LogOut } from "lucide-react";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  return (
    <header className="container fixed left-0 right-0 top-0 mx-auto w-full bg-background/20 px-8 backdrop-blur-sm">
      <div className="flex h-12 items-center justify-between">
        <div className="flex items-center">
          <Bot className="mx-4 size-6 -rotate-12" />
          <h1 className="text-xl font-semibold opacity-100">Mini LLM UI</h1>
        </div>
        <div>
          {status === "authenticated" && (
            <Button variant="ghost" size="icon">
              <Link href={"/api/auth/signout"}>
                <LogOut className="size-4" />
              </Link>
            </Button>
          )}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
