import React from "react";
import Head from "next/head";
import Error from "next/error";

import Layout from 'src/component/layout';

interface Props {
    Component: any;
    pageProps: {
        title?: string;
        robots?: boolean;
        keywords?: string;
        description?: string;
        text?: string;
        isError?: boolean;
    };
}

export default (props: Props) => {
    const { Component, pageProps } = props;

    if (pageProps.isError) {
        return <Error statusCode={400} />;
    }

    return (
        <React.Fragment>
            <Head>
                <title>{pageProps.title}</title>
                {pageProps.robots && (
                    <meta
                        name="robots"
                        content="noindex, nofollow, noarchive"
                    />
                )}
                {pageProps.keywords && (
                    <meta name="keywords" content={pageProps.keywords} />
                )}
                {pageProps.description && (
                    <meta name="description" content={pageProps.description} />
                )}
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </React.Fragment>
    );
};