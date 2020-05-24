export interface CategoriesResponse {
    categories: CategoryResponse[]
}

interface CategoryResponse {
    _id: string
    category: string
    categoryName: string
    parentId?: string
}
