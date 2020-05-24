import axiosBase from 'src/infra/axiosBase'
import { CategoriesResponse } from './response'

export async function getCategoryApi(): Promise<
    CategoriesResponse | undefined
> {
    try {
        const response = await axiosBase
            .get('/api/category')
            .then((response) => response.data)
            .then((responseJson) => responseJson.body)
        return response
    } catch (error) {
        throw error
    }
}
