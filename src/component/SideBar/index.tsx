import React from "react";
import Link from "next/link";
import styled from "styled-components";

const LocalNavigation = styled.div`
    width: 300px;
    text-align: center;
    color: black;
    padding: 20px;
    border-left: 1px solid #dcdcdc;
`;

const Author = styled.div`
    width: 300px;
    text-align: center;
    color: #fff;
`;

const Category = styled.div`
    width: 300px;
    text-align: center;
    color: #fff;
`;

export default () => {
    return (
        <LocalNavigation>
            <Author>@masah7</Author>
            <p>サイドバー</p>
            <Category>@masah7</Category>
        </LocalNavigation>
    );
};