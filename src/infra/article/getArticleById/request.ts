export default class GetArticleByIdRequest {

    constructor(
        private _id: string
    ) { }

    get id(): string {
        return this._id;
    }
}