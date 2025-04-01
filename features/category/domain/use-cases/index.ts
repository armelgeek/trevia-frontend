import { Filter } from "@/features/auth/config/user.type";
import { CategoryPayload } from "../../config/category.type";
import { categoryUseCase } from "./category.use-case";

export async function createCategory(payload: CategoryPayload) {
    return categoryUseCase.create(payload);
}

export async function getCategory(slug: string) {
    return categoryUseCase.getById(slug);
}

export async function updateCategory(slug: string, payload: CategoryPayload) {
    return categoryUseCase.update(slug, payload);
}

export async function deleteCategory(slug: string) {
    return categoryUseCase.delete(slug);
}

export async function getCategories(filter: Filter) {
    return categoryUseCase.list(filter);
}