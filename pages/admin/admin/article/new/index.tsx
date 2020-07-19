import Head from 'next/head'
import Router from 'next/router'
import React, { useEffect } from 'react'
import PostArticle from 'src/component/organisms/Admin/PostArticle'
import CommonTemplate from 'src/component/templates/CommonTemplate'
import CategoryProps from 'src/interface/categoryProps'
import { createCategoryProps } from 'src/libs/CategoryPropsFactory'
import useUser from 'src/libs/useUser'

interface Props {
    categories: CategoryProps[]
}

export async function getServerSideProps() {
    const categoriesPromise: Promise<CategoryProps[]> = createCategoryProps()

    return categoriesPromise
        .then((categoryProps) => {
            return { props: { categories: categoryProps } }
        })
        .catch(() => {
            return { props: {} }
        })
}

const Index = (props: Props) => {
    const { loggedOut } = useUser()
    useEffect(() => {
        if (loggedOut) {
            Router.replace('/login')
        }
    }, [loggedOut])

    const title = `Admin Page | ${process.env.SITE_NAME}`
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="robots" content="noindex, nofollow, noarchive" />
                <meta name="description" content="Admin Page" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="Admin Page" />
            </Head>
            <CommonTemplate>
                <PostArticle {...props} />
            </CommonTemplate>
        </>
    )
}

export default Index
