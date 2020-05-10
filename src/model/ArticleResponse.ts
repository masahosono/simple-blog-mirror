export default class ArticleResponse {

    constructor(
        private _id: string,
        private _title: string,
        private _date: string,
        private _description: string,
        private _text: string
    ) { }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get date(): string {
        return this._date;
    }

    get description(): string {
        return this._description;
    }

    get text(): string {
        return this._text;
    }
}