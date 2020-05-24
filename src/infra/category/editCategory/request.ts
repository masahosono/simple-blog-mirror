export default class EditCategoryRequest {
    constructor(
        private _id: string,
        private _category: string,
        private _categoryName: string,
        private _subCategory?: string,
        private _subCategoryName?: string
    ) {}

    get id() {
        return this._id
    }

    get body() {
        return {
            category: this._category,
            categoryName: this._categoryName,
            subCategory: this._subCategory,
            subCategoryName: this._subCategoryName,
        }
    }
}
