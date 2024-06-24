import ListChats from "./_parts/list-chats";
import ChatLayout from "@/components/nav/chat-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ChatLayout sidebarContent={<ListChats />}>{children}</ChatLayout>;
}
