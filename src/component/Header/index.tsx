import React from "react";
import styled from "styled-components";
// import logo from "../assets/image/title.png";

const Header = styled.header`
    height: 90px;
    background-color: #191970;
    // display: flex;
    text-align: center;
`;

const Title = styled.div`
    text-align: center;
    color: #fff;
    font-size: 30px;
    font-family: "Roboto", sans-serif;
    font-weight: bold;
    // text-shadow: 5px 5px 2px blue;
    padding: 10px;
`;

const TitleImg = styled.img`
    margin: 10px;
`;

const Menu = styled.div`
    color: #fff;
    flex: 1;
`;

export default () => {
    return (
        <Header>
            <TitleImg src="/image/title_logo.png"></TitleImg>
        </Header>
    );
};