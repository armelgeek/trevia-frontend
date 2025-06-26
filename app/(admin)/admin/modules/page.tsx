"use client";

import { SimpleAdminPage } from "@/components/ui/simple-admin-page";
import { ModuleAdminConfig } from "@/features/module/module.admin-config";
import { ModuleSchema } from "@/features/module/module.schema";

export default function ModulesAdminPage() {
  return (
    <SimpleAdminPage
      config={ModuleAdminConfig}
      schema={ModuleSchema}
    />
  );
}
