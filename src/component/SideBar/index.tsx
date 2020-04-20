import Link from "next/link";
import styled from "styled-components";

const LocalNavigation = styled.aside`
    display: block;
    width: 240px;
    padding: 20px;
    border-left: 1px solid #dcdcdc;
`;

const Headline = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    color: #000;
    font-size: 18px;
    margin-bottom: 10px;
`;

const Author = styled.div`
    display: block;
    color: #696969;
    font-size: 14px;
`;
const AuthorInfo = styled.div`
    display: block;
    color: #696969;
    font-size: 14px;
`;

const Category = styled.ul``;
const CategoryLink = styled.li`
    display: block;
    color: #696969;
    font-size: 14px;
    cursor: pointer;
`;

// mockData
const categoryData = [
    { name: "React(2)", value: "React" },
    { name: "html(15)", value: "html" },
];

const monthlyData = [
    { name: "2020/05(2)", value: "202005" },
    { name: "2020/06(15)", value: "202006" },
];

const TitleImg = styled.div`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export default () => {
    return (
        <LocalNavigation>
            <Headline>
                <Title>Author</Title>
            </Headline>
            <Headline>
                <Title>Category</Title>
                <Category>
                    {categoryData.map((category) => {
                        return (
                            <Link href={"/category/" + category.value} passHref>
                                <CategoryLink>{category.name}</CategoryLink>
                            </Link>
                        );
                    })}
                </Category>
            </Headline>
            <Headline>
                <Title>Monthly</Title>
                <Category>
                    {monthlyData.map((monthly) => {
                        return (
                            <Link href={"/date/" + monthly.value} passHref>
                                <CategoryLink>{monthly.name}</CategoryLink>
                            </Link>
                        );
                    })}
                </Category>
            </Headline>
        </LocalNavigation>
    );
};