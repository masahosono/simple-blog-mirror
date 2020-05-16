import React from "react";
import styled from "styled-components";
import Link from "next/link";
import GetArticlesResponse from "src/infra/article/getArticles/response";
import { ArticleData } from "types/article";

const ArticleWrapper = styled.div`
    padding-top: 20px;
`;

const Article = styled.div`
    border-bottom: 1px solid #dcdcdc;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
        color: #87cefa;
    }
`;

const Title = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const Description = styled.div`
    font-size: 14px;
    color: #696969;
    margin-bottom: 10px;
`;

const Date = styled.div`
    font-size: 12px;
    color: #696969;
    margin-bottom: 10px;
`;

interface Props {
    title: string;
    robots: boolean;
    keywords: string;
    description: string;
    articles?: ArticleData[];
}

export default (props: Props) => (
    <ArticleWrapper>
        {props.articles?.map((data, index) => {
            return (
                <Link key={index} href={"/post/" + data._id} passHref>
                    <Article>
                        <Title>{data.title}</Title>
                        <Description>{data.description}</Description>
                        <Date>{data.date}</Date>
                    </Article>
                </Link>
            );
        })}
    </ArticleWrapper >
)