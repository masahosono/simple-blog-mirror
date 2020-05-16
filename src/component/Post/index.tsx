import React from "react";
import { ArticleData } from "types/article";

interface Props {
    article?: ArticleData
}

export default (props: Props) => {
    return <div>{props.article?.text}</div>;
};