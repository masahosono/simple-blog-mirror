import React from "react";
import PostsTemplate from "../../src/component/template/posts";

interface Props {
    title: string;
    robots: boolean;
    keywords: string;
    description: string;
}

// TOP
const Index = (props: Props) => <PostsTemplate {...props} />;

Index.getInitialProps = ({}) => {
    const pageInfo = {
        title: "記事",
        robots: true,
    };
    return { ...pageInfo };
};

export default Index;