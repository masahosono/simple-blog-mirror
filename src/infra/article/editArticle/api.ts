import EditArticleRequest from './request'
import EditArticleResponse from './response'
import axiosBase from 'src/infra/axiosBase'

export async function editArticleApi(request: EditArticleRequest) {
    try {
        const response = await axiosBase
            .put(`/api/article/${request.id}`, request.body)
            .then((response) => response.data)
            .then(
                (responseJson) => new EditArticleResponse(responseJson.body._id)
            )
        return response
    } catch (error) {
        throw error
    }
}
