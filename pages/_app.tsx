import React from "react";
import Head from "next/head";

interface Props {
    Component: any;
    pageProps: {
        title: string;
        robots: boolean;
        keywords: string;
        description: string;
    };
}

export default (props: Props) => {
    const { Component, pageProps } = props;

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
            </Head>
            <Component {...pageProps} />
        </React.Fragment>
    );
};