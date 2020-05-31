import { NextApiRequest } from "next";
import React from "react";
import Pages from "src/component/Pages";
import { getArticles } from "src/infra/article/getArticles/api";
import GetArticlesResponse from "src/infra/article/getArticles/response";
import { ArticleData } from "types/article";
import { PageInfo } from "types/pageInfo";

interface Props {
    pageInfo: PageInfo;
    articles: ArticleData[];
}

const Index = (props: Props) => <Pages {...props} />;

export async function getServerSideProps(req: NextApiRequest) {

    const articlesResponse: GetArticlesResponse | undefined = await getArticles();
    const articles: ArticleData[] | undefined = articlesResponse?.articles;

    if (articles === undefined) {
        return {
            props: {
                isError: true
            }
        }
    }

    const pageInfo = {
        title: "",
        robots: false,
        description: "",
    };

    return { props: { ...pageInfo, articles } }
}

export default Index;