import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { SupportForm } from "@/components/SupportForm";
import { url } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: "Send a secure support message to the Agentfly team.",
  alternates: { canonical: url("/support") },
  robots: { index: false, follow: false },
};

export default function SupportPage() {
  return (
    <AppShell title="Support" subtitle="One message, sent directly to the Agentfly team.">
      <SupportForm />
    </AppShell>
  );
}
