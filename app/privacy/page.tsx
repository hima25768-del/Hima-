import type { Metadata } from "next";
import SiteShell from "../site-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | HIM BAZ",
  description: "How HIM BAZ collects, uses, and protects information submitted through this website.",
};

export default function PrivacyPage() {
  return <SiteShell page="privacy" />;
}
