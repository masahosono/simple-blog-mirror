import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const Title = styled.p`
    font-size: 32px;
    font-weight: bold;
    line-height: 1.4;
    margin: 15px 0 0;
`

const Admin: React.FC = () => {
    return (
        <>
            <Title>Admin Page</Title>
            <p>
                <Link href="/admin/article" passHref>
                    Edit article
                </Link>
            </p>
            <p>
                <Link href="/admin/article/new" passHref>
                    Post new article
                </Link>
            </p>
            <p>
                <Link href="/admin/category" passHref>
                    Edit Category
                </Link>
            </p>
        </>
    )
}
export default Admin
