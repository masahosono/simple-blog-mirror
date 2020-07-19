import React from 'react'
import styled from 'styled-components'

const SITE_NAME = process.env.SITE_NAME || ''

const FooterComponent = styled.footer`
    height: 70px;
    background-color: #517d99;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Copyright = styled.div`
    font-weight: bold;
    font-size: 12px;
`

const Footer = () => {
    return (
        <FooterComponent>
            <Copyright>
                <span>Copyright (C) 2021 {SITE_NAME} All Rights Reserved.</span>
            </Copyright>
        </FooterComponent>
    )
}

export default Footer
