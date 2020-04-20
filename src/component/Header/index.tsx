import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Header = styled.header`
    height: 75px;
    background-color: #517D99;
    // background-color: black;
    text-align: center;
    border-bottom: 1px solid #dcdcdc;
`;

const TitleImg = styled.img`
    margin: 10px;
    cursor: pointer;
`;

const Menu = styled.div`
    color: #fff;
    flex: 1;
`;

export default () => {
    return (
        <Header>
            <Link href="/" passHref>
                <TitleImg src="/image/title_logo.png"></TitleImg>
            </Link>
        </Header>
    );
};