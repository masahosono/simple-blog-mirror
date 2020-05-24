import PostCategoryRequest from "./request";
import PostCategoryResponse from "./response";
import axiosBase from "src/infra/axiosBase";

export async function postCategoryApi(request: PostCategoryRequest) {
    try {
        const response = await axiosBase.post('/api/category',
            request.body
        )
            .then(
                response => response.data
            )
            .then(
                responseJson => new PostCategoryResponse(
                    responseJson.body._id,
                )
            )
        return response;
    } catch (error) {
        throw error;
    }
}