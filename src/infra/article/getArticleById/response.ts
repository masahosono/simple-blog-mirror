export interface ArticleResponse {
    article: {
        _id: string
        title: string
        categoryId: string
        createDate: Date
        updateDate: Date
        text: string
        disp: Boolean
    }
}
