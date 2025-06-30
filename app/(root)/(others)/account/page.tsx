import { Metadata } from "next";
import AccountPageClient from "./account-page-client";

export const metadata: Metadata = { title: "Settings" };

export default function Page() {
  return <AccountPageClient />;
}
