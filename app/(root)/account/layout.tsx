import { Metadata } from "next";
import { ReactNode } from "react";
import AppProfileClient from "@/shared/components/molecules/layout/app-profile-client";
import { Footer } from "@/components/ui/footer";
import { kAppName } from "@/shared/lib/constants/app.constant";

type Props = { children: ReactNode };

export const metadata: Metadata = {
  title: {
    template: `%s - Account - ${kAppName}`,
    default: `Account - ${kAppName}`,
  },
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <AppProfileClient>
          {children}
        </AppProfileClient>
      </div>
      <Footer variant="minimal" showNewsletter={false} showStats={false} />
    </div>
  );
}
