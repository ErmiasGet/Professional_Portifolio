import { MessageInbox } from "@/components/admin/message-inbox";

export const metadata = {
  title: "Messages",
};

export default async function MessagesPage() {
  return <MessageInbox />;
}