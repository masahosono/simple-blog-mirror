import Head from 'next/head'
import Router from 'next/router'
import React, { useEffect } from 'react'

import Admin from 'src/component/organisms/Admin'
import CommonTemplate from 'src/component/templates/CommonTemplate'
import useUser from 'src/libs/useUser'

const Index = (): JSX.Element | undefined => {
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
                <Admin />
            </CommonTemplate>
        </>
    )
}

export default Index
