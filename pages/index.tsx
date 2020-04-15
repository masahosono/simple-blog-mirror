import React from "react";
import TopTemplate from "../src/component/template/top";

interface Props {
    title: string;
    robots: boolean;
    keywords: string;
    description: string;
}

// TOP
const Index = (props: Props) => <TopTemplate {...props} />;

Index.getInitialProps = ({}) => {
    const pageInfo = {
        title: "",
        robots: false,
        description: "",
    };
    return { ...pageInfo };
};

export default Index;