import { response } from "express";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { useRouter } from 'next/router'
import React from "react";
import PostsTemplate from "src/component/template/posts";
import { getArticle } from "src/infra/article/api";
import ArticleResponse from "src/model/ArticleResponse";

interface Props {
    title?: string;
    robots?: boolean;
    keywords?: string;
    date?: string;
    description?: string;
    text?: string
    isError?: boolean
}

// TOP
const Index = (props: Props) => {
    const router = useRouter();
    return <PostsTemplate {...props} />;
}

export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse) {

    const {
        query: { id }
    } = req

    const articleResponse: ArticleResponse | undefined = await getArticle(id as string);

    // TODO: エラーハンドリング追加
    if (articleResponse === undefined) {
        return {
            props: {
                isError: true
            }
        }
    }

    const pageInfo = {
        title: `${articleResponse?.title} - masah7.net`,
        robots: false,
        date: articleResponse?.date,
        description: articleResponse?.description,
        text: articleResponse?.text
    };

    return { props: { ...pageInfo } }
}

export default Index;