import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import Post from "src/component/Post";
import getArticleById from "src/infra/article/getArticleById/api";
import ArticleRequest from "src/infra/article/getArticleById/request";
import ArticleResponse from "src/infra/article/getArticleById/response";
import { ArticleData } from "types/article";
import { PageInfo } from "types/pageInfo";

interface Props {
    pageInfo: PageInfo;
    article: ArticleData;
}

// TOP
const Index = (props: Props) => {
    return <Post {...props} />;
}

export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse) {

    const {
        query: { id }
    } = req

    const articleRequest: ArticleRequest = new ArticleRequest(id as string);
    const articleResponse: ArticleResponse | undefined = await getArticleById(articleRequest);
    const article = articleResponse?.article;

    console.log(article)

    if (article === undefined) {
        return {
            props: {
                isError: true
            }
        }
    }

    const pageInfo = {
        title: `${article?.title}`,
        description: article.description,
        robots: false
    };

    return { props: { ...pageInfo, article } }
}

export default Index;