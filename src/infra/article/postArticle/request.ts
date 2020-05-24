export default class PostArticleRequest {
    constructor(
        private _title: string,
        private _text: string,
        private _categoryId: string
    ) {}

    get body() {
        return {
            title: this._title,
            text: this._text,
            categoryId: this._categoryId,
        }
    }
}
