import axiosBase from 'src/infra/axiosBase'
import DeleteCategoryRequest from './request'

export async function deleteCategoryApi(request: DeleteCategoryRequest) {
    try {
        const response = await axiosBase
            .delete(`/api/category/${request.id}`)
            .then((response) => response.data)
            .then((responseJson) => responseJson.body)
        return response
    } catch (error) {
        throw error
    }
}
