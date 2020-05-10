import { NextApiRequest } from "next";
import React from "react";
import TopTemplate from "src/component/template/top";

interface Props {
    title: string;
    @@ -11,14 +14,20 @@ interface Props {
// TOP
    const Index = (props: Props) => <TopTemplate {...props} />;

export async function getServerSideProps(req: NextApiRequest) {

    await fetch(`http://localhost:3000/api/atricle/page/1`, {
        method: 'Get',
    })

    const pageInfo = {
        title: "",
        robots: false,
        description: "",
    };

    return { props: { ...pageInfo } }
}

export default Index;