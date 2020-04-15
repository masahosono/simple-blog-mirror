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
    background-color: #f5f5f5;
`;

const Main = styled.div`
    display: flex;
    min-height: 100vh;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    background-color: white;
`;

const ContentWrapper = styled.div`
    flex: 1;
    text-align: center;
    margin-left: 10px;
`;

const Content = styled.div`
    max-width: 1000px;
    text-align: center;
    margin: 20px auto;
`;

export default (props: Props) => (
    <div>
        <Header />
        <MainWrapper>
            <Main>
                <ContentWrapper>
                    <Content>
                        <Pages />
                    </Content>
                </ContentWrapper>
                <SideBar />
            </Main>
        </MainWrapper>
        <Footer />
    </div>
);