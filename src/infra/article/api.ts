import { response } from "express";
import ArticleResponse from "src/model/ArticleResponse";
import axiosBase from "../axiosBase";

export async function getArticle(id: string): Promise<ArticleResponse | undefined> {
    try {
        const response = await axiosBase.get(`/api/article/${id}`)
            .then(
                response => response.data
            )
            .then(
                responseJson => new ArticleResponse(
                    responseJson.data._id,
                    responseJson.data.title,
                    responseJson.data.date,
                    responseJson.data.description,
                    responseJson.data.text
                )
            )
        return response;
    } catch (error) {
        console.log(error);
    }
}

export function postArticle() {

}