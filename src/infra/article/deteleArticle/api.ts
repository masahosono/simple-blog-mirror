import axiosBase from "src/infra/axiosBase";

import DeleteArticleRequest from "./request";
import DeleteArticleResponse from "./response";

export async function deleteArticleApi(request: DeleteArticleRequest) {
    try {
        const id = request.id;
        const response = await axiosBase.delete(`/api/article/${id}`)
            .then(
                response => response.data
            )
            .then(
                responseJson => new DeleteArticleResponse(
                    responseJson.body._id,
                )
            )
        return response;
    } catch (error) {
        console.log(error);
    }
}