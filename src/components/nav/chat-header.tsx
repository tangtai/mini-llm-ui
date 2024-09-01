"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  MessageSquarePlus,
  List,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function ChatHeader({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  return (
    <header className="container fixed left-0 right-0 top-0 mx-auto w-full px-8 backdrop-blur-sm">
      <div className="flex h-12 items-center justify-between">
        <div className="flex justify-between gap-2">
          <Button
            onClick={() => toggleSidebar()}
            variant={"outline"}
            size={"icon"}
          >
            <List className="size-4" />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <Link href="/chat-ssr">
              <MessageSquarePlus className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="flex justify-between gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="icon">
                <Settings className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
              <DropdownMenuLabel>Hi, {session?.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <Link href={"/api/auth/signout"}>
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
