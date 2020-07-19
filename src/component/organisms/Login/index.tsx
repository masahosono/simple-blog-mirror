import React, { useState } from 'react'

import { login } from 'src/infra/user/login/api'
import LoginRequest from 'src/infra/user/login/request'

import styled from 'styled-components'
import { useRouter } from 'next/router'

const LoginWrapper = styled.div`
    max-width: 500px;
    text-align: center;
    border: #dcdcdc 1px solid;
    margin: 0 auto;
`

const LoginInner = styled.div`
    padding: 20px;
`

const Input = styled.input`
    display: block;
    width: 100%;
    white-space: normal;
    height: 38px;
    box-sizing: border-box;
    margin-bottom: 20px;
`

const ButtonWrapper = styled.div`
    text-align: right;
`

const Button = styled.button`
    color: #fff;
    background-color: #517d99;
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.5;
    padding: 8px 14px 8px 14px;
    cursor: pointer;
    border-radius: 0.5rem;
    border: none;
    outline: none;

    &:hover {
        background: #f56500;
    }
`

interface Form {
    id: string
    password: string
}

function validateRequired(value: string) {
    return value === ''
}

const Login = () => {
    const router = useRouter()
    const [form, setForm] = useState<Form>({
        id: '',
        password: '',
    })

    const postLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            const idError = validateRequired(form.id)
            const passwordError = validateRequired(form.password)

            if (idError || passwordError) {
                throw new Error('required')
            }

            const request = new LoginRequest(form.id, form.password)

            await login(request)

            router.push(`/admin`)
        } catch (error) {
            alert(error.message)
        }
    }
    const postAdmin = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            router.push(`/admin`)
            return
        } catch (error) {
            alert(error.message)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        setForm({
            ...form,
            [target.name]: target.value,
        })
    }

    return (
        <LoginWrapper>
            <LoginInner>
                <form onSubmit={() => false}>
                    <Input
                        type="text"
                        name="id"
                        placeholder="ID"
                        value={form.id}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <ButtonWrapper>
                        <Button type="button" onClick={postLogin}>
                            login
                        </Button>
                    </ButtonWrapper>
                </form>
            </LoginInner>
        </LoginWrapper>
    )
}
export default Login
