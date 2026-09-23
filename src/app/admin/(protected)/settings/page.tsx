import { SettingsEditor } from "@/components/admin/settings-editor";

export const metadata = {
  title: "Site Settings",
};

export default async function SettingsPage() {
  return <SettingsEditor />;
}