export interface ArticlesResponse {
    articles: ArticleResponse[]
}

interface ArticleResponse {
    _id: string
    title: string
    categoryId: string
    createDate: Date
    updateDate: Date
    text: string
    disp: Boolean
}
