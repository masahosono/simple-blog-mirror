export default class DeleteCategoryRequest {
    constructor(private _id: string) {}

    get id() {
        return this._id
    }
}
