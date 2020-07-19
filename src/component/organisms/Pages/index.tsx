import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { ArticleProps } from 'src/interface/articleProps'
import moment from 'moment'

const ArticleWrapper = styled.div`
    padding-top: 20px;
`

const Article = styled.div`
    border-bottom: 1px solid #dcdcdc;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
        color: #87cefa;
    }
`

const Title = styled.div`
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

const DateWrapper = styled.div`
    margin: 15px 0 0;
`
const CreateDate = styled.time`
    font-size: 14px;
    color: #a5aaaf;
    padding: 0 10px 0 0;
    :before {
        font-family: 'Font Awesome 5 Free';
        content: '\f017';
        font-weight: 900;
        padding-right: 5px;
    }
`
const UpdateDate = styled.time`
    font-size: 14px;
    color: #a5aaaf;
    :before {
        font-family: 'Font Awesome 5 Free';
        content: '\f021';
        font-weight: 900;
        padding-right: 5px;
    }
`

interface Props {
    articles?: ArticleProps[]
}

const Pages = (props: Props) => (
    <ArticleWrapper>
        {props.articles?.map((data, index) => {
            return (
                <Link key={index} href={'/post/' + data._id} passHref>
                    <Article>
                        <Title>{data.title}</Title>
                        <DateWrapper>
                            <CreateDate>
                                {moment(data.createDate).format(
                                    'YYYY/MM/DD HH:mm'
                                )}
                            </CreateDate>
                        </DateWrapper>
                    </Article>
                </Link>
            )
        })}
    </ArticleWrapper>
)
export default Pages
