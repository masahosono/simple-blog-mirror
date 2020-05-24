import axiosBase from 'src/infra/axiosBase'
import EditCategoryRequest from './request'

export async function editCategoryApi(request: EditCategoryRequest) {
    try {
        const response = await axiosBase
            .put(`/api/category/${request.id}`, request.body)
            .then((response) => response.data)
            .then((responseJson) => responseJson.body)
        return response
    } catch (error) {
        throw error
    }
}
