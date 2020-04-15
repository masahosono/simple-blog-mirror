import Header from "../Header";
import Footer from "../Footer";
import React from "react";
import Pages from "../Pages";

interface Props {
    title: string;
    robots: boolean;
}

export default (props: Props) => (
    <div>
        <Header />
        <Pages />
        <Footer />
    </div>
);