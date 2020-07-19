import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import img from 'public/image/title_logo.png'

const HeaderComponent = styled.header`
    background-color: #517d99;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TitleImg = styled.img`
    width: 300px;
    cursor: pointer;
`

const Header = () => {
    return (
        <HeaderComponent>
            <Link href="/" passHref>
                <TitleImg src={img}></TitleImg>
            </Link>
        </HeaderComponent>
    )
}

export default Header
