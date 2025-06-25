import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangePassword } from "@/features/auth/components/organisms/change-password-form";
import { Metadata } from "next";
export const metadata: Metadata = { title: "Update Password" };

export default async function Page() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Password</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 mb-4">
                        {`Update your password to keep your account secure. Choose a strong, unique password that you don't use for other accounts.`}
                    </p>
                    <ChangePassword />
                </CardContent>

            </Card>
        </>
    )
}