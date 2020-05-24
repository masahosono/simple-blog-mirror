export default class PostCategoryRequest {
    constructor(
        private _category: string,
        private _categoryName: string,
        private _parentId?: string
    ) {}

    get body() {
        return {
            category: this._category,
            categoryName: this._categoryName,
            parentId: this._parentId,
        }
    }
}
