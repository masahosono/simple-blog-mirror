import Header from "../Header";
import Pages from "../Pages";
import Footer from "../Footer";
import React from "react";
import SideBar from "../SideBar";
import styled from "styled-components";

interface Props {
    title: string;
    robots: boolean;
}

const MainWrapper = styled.main`
    padding-top: 30px;
    background-color: white;
`;

const Main = styled.div`
    display: flex;
    min-height: 100vh;
    max-width: 1177px;
    margin: auto;
    background-color: white;
`;

const ContentWrapper = styled.div`
    flex: 1;
    text-align: center;
    margin-left: 10px;
`;

const Content = styled.div`
    flex: 1;
    max-width: 1100px;
    margin: 20px;
`;

export default (props: Props) => (
    <>
         <Header />
        <MainWrapper>
            <Main>
                <Content>
                    <Pages />
                </Content>
                <SideBar />
            </Main>
        </MainWrapper>
        <Footer />
    </>
);