import React from 'react'
import styled from 'styled-components'
import { ArticleProps } from 'src/interface/articleProps'

import { useRouter } from 'next/router'
import moment from 'moment'

const ArticleWrapper = styled.div`
    padding-top: 20px;
`

const Article = styled.div`
    border-bottom: 1px solid #dcdcdc;
    margin-bottom: 20px;
    cursor: pointer;
`

const Title = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`

const Description = styled.div`
    font-size: 14px;
    color: #696969;
    margin-bottom: 10px;
`

const Date = styled.div`
    font-size: 12px;
    color: #696969;
    margin-bottom: 10px;
`

interface Props {
    articles?: ArticleProps[]
}

const EditArticles = (props: Props) => {
    const router = useRouter()
    const editArticle = (id: string) => {
        router.push(`/admin/article/edit/${id}`)
    }

    return (
        <ArticleWrapper>
            {props.articles?.map((data, index) => {
                return (
                    <>
                        <Article>
                            <Title>{data.title}</Title>
                            <Description>説明文</Description>
                            <Date>{data.createDate}</Date>
                            <button
                                className="btn"
                                onClick={() => editArticle(data._id)}
                            >
                                Edit
                            </button>
                        </Article>
                    </>
                )
            })}
        </ArticleWrapper>
    )
}
export default EditArticles
