import { NextApiRequest } from "next";
import EditArticle from "src/component/Admin/EditArticle";

import getArticleById from "src/infra/article/getArticleById/api";
import ArticleRequest from "src/infra/article/getArticleById/request";
import ArticleResponse from "src/infra/article/getArticleById/response";

import { ArticleData } from "types/article";
import { PageInfo } from "types/pageInfo";

interface Props {
    pageInfo: PageInfo;
    article: ArticleData;
}

const Index = (props: Props) => <EditArticle {...props} />;

export async function getServerSideProps(req: NextApiRequest) {
    const {
        query: { id }
    } = req

    const articleRequest: ArticleRequest = new ArticleRequest(id as string);
    const articleResponse: ArticleResponse | undefined = await getArticleById(articleRequest);
    const article = articleResponse?.article;

    if (article == undefined) {
        return {
            props: {
                isError: true
            }
        }
    }

    const pageInfo = {
        title: "",
        description: "",
        robots: true,
    };

    return { props: { ...pageInfo, article } }
}

export default Index;