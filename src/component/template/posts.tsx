import Header from "../Header";
import Footer from "../Footer";
import React from "react";
import Posts from "../Posts";

interface Props {
    title: string;
    robots: boolean;
}

export default (props: Props) => (
    <div>
        <Header />
        <Posts />
        <Footer />
    </div>
);