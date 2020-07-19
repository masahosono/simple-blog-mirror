import React from 'react'

import Header from 'src/component/organisms/Header'
import Footer from 'src/component/organisms/Footer'
import ContentWrapper from 'src/component/organisms/ContentWrapper'
import Main from 'src/component/organisms/Main'
import Admin from 'src/component/organisms/Admin'

interface Props {}

const CommonTemplate: React.FC<Props> = ({ children }): React.ReactElement => (
    <>
        <Header />
        <Main>
            <ContentWrapper>{children}</ContentWrapper>
        </Main>
        <Footer />
    </>
)
export default CommonTemplate
