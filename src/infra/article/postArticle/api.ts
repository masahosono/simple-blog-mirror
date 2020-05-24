import PostArticleRequest from './request'
import PostArticleResponse from './response'
import axiosBase from 'src/infra/axiosBase'

export async function postArticleApi(request: PostArticleRequest) {
    try {
        const response = await axiosBase
            .post('/api/article', request.body)
            .then((response) => response.data)
            .then(
                (responseJson) => new PostArticleResponse(responseJson.body._id)
            )
        return response
    } catch (error) {
        throw error
    }
}
