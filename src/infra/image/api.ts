import axiosBase from "src/infra/axiosBase";
import PostImageResponse from "./response";

export async function uploadImageApi(file: any, fileName: string): Promise<PostImageResponse> {
    try {
        const params = new FormData();
        params.append('file', file, fileName);

        const response = await axiosBase.post('/api/image',
            params,
            {
                headers: {
                    'content-type': 'multipart/form-data',
                }
            }
        ).then(
            response => new PostImageResponse(response.data.imageUrl)
        )
        return response;
    } catch (error) {
        throw error;
    }
}