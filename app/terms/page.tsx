import type { Metadata } from "next";
import SiteShell from "../site-shell";

export const metadata: Metadata = {
  title: "Terms & Conditions | HIM BAZ",
  description: "General terms for using the HIM BAZ website and requesting digital services.",
};

export default function TermsPage() {
  return <SiteShell page="terms" />;
}
