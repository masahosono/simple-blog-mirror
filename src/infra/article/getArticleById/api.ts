import axiosBase from 'src/infra/axiosBase'

import GetArticleByIdRequest from './request'
import { ArticleResponse } from './response'

export default async function getArticleByIdApi(
    request: GetArticleByIdRequest
): Promise<ArticleResponse | undefined> {
    try {
        const id = request.id
        const res = await axiosBase
            .get(`/api/article/${id}`)
            .then((response) => response.data)
            .then((responseJson) => responseJson.body)
        return res
    } catch (error) {
        console.log(error)
    }
}
