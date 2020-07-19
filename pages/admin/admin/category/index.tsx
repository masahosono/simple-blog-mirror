import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect } from 'react'
import EditCategory from 'src/component/organisms/Admin/EditCategory'
import CommonTemplate from 'src/component/templates/CommonTemplate'

import CategoryProps from 'src/interface/categoryProps'
import { createCategoryProps } from 'src/libs/CategoryPropsFactory'
import useUser from 'src/libs/useUser'

const SITE_NAME = process.env.SITE_NAME

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
            return {
                redirect: {
                    permanent: false,
                    destination: '/login',
                },

                props: {} as never,
            }
        })
}

const Index = (props: Props): JSX.Element | undefined => {
    const { loggedOut } = useUser()

    useEffect(() => {
        if (loggedOut) {
            Router.replace('/login')
        }
    }, [loggedOut])
    const title = `カテゴリ管理画面 | ${SITE_NAME}`

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="robots" content="noindex, nofollow, noarchive" />
                <meta name="description" content="hoge" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="hoge" />
            </Head>
            <CommonTemplate>
                <EditCategory {...props} />
            </CommonTemplate>
        </>
    )
}

export default Index
