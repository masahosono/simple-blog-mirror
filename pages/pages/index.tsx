import React from "react";
import PagesTemplate from "../../src/component/template/pages";

interface Props {
    title: string;
    robots: boolean;
    keywords: string;
    description: string;
}

// TOP
const Index = (props: Props) => <PagesTemplate {...props} />;

Index.getInitialProps = ({}) => {
    const pageInfo = {
        title: "記事一覧",
        robots: true,
    };
    return { ...pageInfo };
};

export default Index;