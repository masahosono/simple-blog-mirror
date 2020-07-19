import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import React, { useEffect } from 'react'
import EditArticles from 'src/component/organisms/Admin/EditArticles'
import CommonTemplate from 'src/component/templates/CommonTemplate'

import { ArticleProps } from 'src/interface/articleProps'
import { articlesFactory } from 'src/libs/ArticlePropsFactory'
import useUser from 'src/libs/useUser'

interface Props {
    articles?: ArticleProps[]
}

export async function getServerSideProps() {
    const articlesPromise: Promise<ArticleProps[]> = articlesFactory()

    return articlesPromise
        .then((articlesProps) => {
            return { props: { articles: articlesProps } }
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

    const title = `記事管理画面 | ${process.env.SITE_NAME}`

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="robots" content="noindex, nofollow, noarchive" />
                <meta property="og:title" content={title} />
            </Head>
            <CommonTemplate>
                <EditArticles {...props} />
            </CommonTemplate>
        </>
    )
}

export default Index
