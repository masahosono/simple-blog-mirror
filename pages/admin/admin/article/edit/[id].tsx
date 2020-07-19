import { NextApiRequest } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useEffect } from 'react'
import EditArticle from 'src/component/organisms/Admin/EditArticle'
import CommonTemplate from 'src/component/templates/CommonTemplate'
import getArticleByIdApi from 'src/infra/article/getArticleById/api'

import Error from 'next/error'

import { ArticleProps } from 'src/interface/articleProps'
import { articleFactory } from 'src/libs/ArticlePropsFactory'
import useUser from 'src/libs/useUser'

interface Props {
    article: ArticleProps
}

export async function getServerSideProps(req: NextApiRequest) {
    const {
        query: { id },
    } = req

    const articlePromise = articleFactory(id as string)

    return articlePromise
        .then((articleProps) => {
            return { props: { article: articleProps } }
        })
        .catch(() => {
            return { props: {} }
        })
}

const Index = (props: Props): JSX.Element | undefined => {
    const { loggedOut } = useUser()
    useEffect(() => {
        if (loggedOut) {
            Router.replace('/login')
        }
    }, [loggedOut])

    const title = `Article Edit | ${process.env.SITE_NAME}`

    if (props.article == undefined) {
        return <Error statusCode={404} />
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="robots" content="noindex, nofollow, noarchive" />
            </Head>
            <CommonTemplate>
                <EditArticle {...props} />
            </CommonTemplate>
        </>
    )
}

export default Index
