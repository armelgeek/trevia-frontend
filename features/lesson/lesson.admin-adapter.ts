import { LessonService } from './lesson.service';
import { Lesson } from './lesson.schema';

// Adapte les méthodes du service pour la page admin générique (parentId = moduleId)
export const LessonAdminAdapter = {
  fetchItems: async (params: { parentId: string }) => {
    const res = await LessonService.list(params.parentId);
    // Ajoute les champs manquants pour la compatibilité stricte
    const data = (res.data as unknown as Lesson[]).map((l) => ({
      ...l,
      order: typeof l.order === 'number' ? l.order : 0,
      description: l.description ?? '',
    }));
    return { data };
  },
  createItem: async (data: { title: string; description?: string; parentId: string }) => {
    const { parentId, title, description } = data;
    const lessonPayload = {
      title,
      content: description ?? '',
      moduleId: parentId,
    };
    const res = await LessonService.create(parentId, lessonPayload);
    // Ajoute les champs manquants pour la compatibilité stricte
    return { ...res.data, order: 0, description: res.data.content ?? '' };
  },
  updateItem: async (id: string, data: Partial<Lesson> & { parentId: string }) => {
    const { parentId, ...payload } = data;
    const res = await LessonService.update(parentId, id, payload);
    return { ...res.data, order: 0, description: res.data.content ?? '' };
  },
  deleteItem: async (id: string, params: { parentId: string }) => {
    await LessonService.delete(params.parentId, id);
  },
};
