export default class EditArticleRequest {
    constructor(
        private _id: string,
        private _title: string,
        private _text: string,
        private _category: string
    ) {}

    get id(): string {
        return this._id
    }

    get body() {
        return {
            title: this._title,
            text: this._text,
            category: this._category,
        }
    }
}
