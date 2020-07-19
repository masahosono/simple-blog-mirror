import highlight from 'highlightjs'
import marked from 'marked'
import moment from 'moment'
import { useEffect } from 'react'
import styled from 'styled-components'
import { ArticleProps } from 'src/interface/articleProps'

interface Props {
    article: ArticleProps
}

const Article = styled.div`
    width: 100%;
`

const ArticleInfo = styled.div`
    margin-bottom: 38px;
`

const Category = styled.span`
    font-size: 14px;
    color: #a5aaaf;
    :before {
        font-family: 'Font Awesome 5 Free';
        content: '\f07b';
        font-weight: 900;
        padding-right: 5px;
    }
`

const Title = styled.p`
    font-size: 32px;
    font-weight: bold;
    line-height: 1.4;
    margin: 15px 0 0;
`

const CategoryWrapper = styled.div`
    margin: 15px 0 0;
`

const DateWrapper = styled.div`
    margin: 10px 0 0;
    display: flex;
    justify-content: flex-end;
`

const CreateDate = styled.span`
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

const UpdateDate = styled.span`
    font-size: 14px;
    color: #a5aaaf;
    padding: 0 10px 0 0;
    :before {
        font-family: 'Font Awesome 5 Free';
        content: '\f021';
        font-weight: 900;
        padding-right: 5px;
    }
`

const Text = styled.div`
    margin: 15px 0 0;
    width: 100%;

    pre {
        background-color: #2e3440;
        margin: 12px -20px 32px -20px;
        padding: 24px;
    }

    img {
        max-width: 100%;
        margin: 12px 0 24px 0;
    }

    ul {
        list-style-type: disc;
        padding-left: 24px;
        margin: 24px 0;
        line-height: 1.8;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 2.2em;
        margin-bottom: 1.2rem;
    }

    h1 {
        font-size: 32px;
        border-bottom: 1px solid #ddd;
    }

    h2 {
        font-size: 28px;
        border-bottom: 1px solid #ddd;
    }

    h3 {
        font-size: 22px;
    }
`

marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: (code, lang) => {
        return (
            '<code class="hljs">' +
            highlight.highlightAuto(code, [lang]).value +
            '</code>'
        )
    },
})

const Post = (props: Props) => {
    useEffect(() => {
        window!.twttr!.widgets!.load()
    }, [])

    return (
        <Article>
            <ArticleInfo>
                <Category>{props.article.categoryName}</Category>
                <Title>{props.article.title}</Title>
                <DateWrapper>
                    <div>
                        <CreateDate>
                            {moment(props.article.createDate).format(
                                'YYYY/MM/DD HH:mm'
                            )}
                        </CreateDate>
                        <UpdateDate>
                            {moment(props.article.updateDate).format(
                                'YYYY/MM/DD HH:mm'
                            )}
                        </UpdateDate>
                    </div>
                </DateWrapper>
            </ArticleInfo>
            <Text
                dangerouslySetInnerHTML={{ __html: marked(props.article.text) }}
            />
        </Article>
    )
}

export default Post
