import axiosBase from 'src/infra/axiosBase'
import { ArticlesResponse } from './response'

export async function getArticlesApi(): Promise<ArticlesResponse | undefined> {
    try {
        const response = await axiosBase
            .get(`/api/article`)
            .then((response) => response.data)
            .then((responseJson) => responseJson.body)
        return response
    } catch (error) {
        console.log(error)
    }
}
