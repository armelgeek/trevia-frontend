"use client";

import { useParams } from "next/navigation";
import { LessonAdminConfig } from "@/features/lesson/lesson.admin-config";
import { SimpleAdminPage } from "@/components/ui/simple-admin-page";
import { LessonSchema } from "@/features/lesson/lesson.schema";

export default function ModuleLessonsAdminPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  // On passe le parentId (moduleId) comme filtre pour l'admin générique
  return (
    <SimpleAdminPage
      config={LessonAdminConfig}
      schema={LessonSchema}
      filters={{ moduleId: typeof moduleId === 'string' ? moduleId : Array.isArray(moduleId) ? moduleId[0] : '' }}
    />
  );
}
