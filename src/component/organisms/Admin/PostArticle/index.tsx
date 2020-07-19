import React, { useState } from 'react'

import { postArticleApi } from 'src/infra/article/postArticle/api'
import PostArticleResponse from 'src/infra/article/postArticle/response'
import PostArticleRequest from 'src/infra/article/postArticle/request'

import { uploadImageApi } from 'src/infra/image/api'

import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

import styled from 'styled-components'
import { useRouter } from 'next/router'
import moment from 'moment'
import PostImageResponse from 'src/infra/image/response'
import CategoryProps from 'src/interface/categoryProps'

const FormGroup = styled.div`
    margin-bottom: 14px;
`

const Input = styled.input`
    display: block;
    width: 100%;
    height: 32px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
`

const Select = styled.select`
    display: block;
    width: 100%;
    height: 32px;
`

const Button = styled.button`
  
  color: #fff;
  background-color: #517D99;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.5;
  padding: 8px;
  cursor: pointer;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  
  &:hover {
    background: #f56500;
  }
}
`

const ButtonWrapper = styled.div`
    text-align: right;
`

const CategoryTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    max-width: 500px;

    th,
    td {
        border: 1px solid rgb(118, 118, 118);
    }
`

const CategoryWrapper = styled.div`
    border-collapse: collapse;
    width: 100%;
    max-width: 500px;
    border-top: 1px solid #bbb;
    border-left: 1px solid #bbb;
    border-right: 1px solid #bbb;
`

const CategoryTableMainColumn = styled.tr`
    height: 30px;
`

const CategoryTableSubColumn = styled.tr`
    height: 30px;
`

interface Props {
    categories: CategoryProps[]
}

interface Form {
    title: string
    categoryId: string
    text: string
}

function validateRequired(value: string) {
    return value === ''
}

interface Category {
    _id: string
    category: string
    categoryName: string
    subCategory?: SubCategory[]
}

interface SubCategory {
    _id: string
    category: string
    categoryName: string
    subCategory?: SubCategory[]
}

const PostArticle = (props: Props) => {
    const router = useRouter()
    const [form, setForm] = useState<Form>({
        title: '',
        categoryId: '',
        text: '',
    })

    const postArticle = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            const titleErrors = validateRequired(form.title)
            const textErrors = validateRequired(form.text)

            if (titleErrors || textErrors) {
                throw new Error('required')
            }

            const request = new PostArticleRequest(
                form.title,
                form.text,
                form.categoryId
            )
            const response:
                | PostArticleResponse
                | undefined = await postArticleApi(request)

            // jump article page
            router.push(`/post/${response.id}`)
        } catch (error) {
            alert(error.message)
        }
    }

    const uploadImage = async (
        file: any,
        fileName: string,
        type: string
    ): Promise<string | undefined> => {
        try {
            const postImageResponse: PostImageResponse = await uploadImageApi(
                file,
                fileName + `.${type}`
            )
            return postImageResponse.imageUrl
        } catch (error) {
            alert('Failed upload image')
        }
    }

    const changeText = (text: string) => {
        setForm({
            ...form,
            text: text,
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        setForm({
            ...form,
            [target.name]: target.value,
        })
    }

    const handleDrop = async (data: string, e: any) => {
        if (e.dataTransfer?.files.length === 0) {
            return
        } else {
            e.preventDefault()
        }
        const files = e.dataTransfer?.files
        const file = files[0]

        if (
            file.type === 'image/png' ||
            file.type === 'image/jpeg' ||
            file.type === 'image/gif'
        ) {
            let type: string
            switch (file.type) {
                case 'image/png':
                    type = 'png'
                    break
                case 'image/jpeg':
                    type = 'jpg'
                    break
                case 'image/gif':
                    type = 'gif'
                    break
                default:
                    type = ''
            }

            const fileName = moment().format('YYYYMMDDHHmmss')
            const imageUrl = await uploadImage(file, fileName, type)

            if (!imageUrl) {
                return
            }
            // insert
            simpleMde.codemirror.replaceSelection('![](' + imageUrl + ')')
        } else {
            alert('not image')
        }
    }

    const handlePaste = async (data: any, e: any) => {
        if (
            e.clipboardData?.files === undefined ||
            e.clipboardData?.files.length === 0
        ) {
            return
        } else {
            e.preventDefault()
        }
        const files: FileList = e.clipboardData.files
        const file = files[0]

        // クリップボード経由のため、画像であればimage/png
        if (file.type === 'image/png') {
            const fileName = moment().format('YYYYMMDDHHmmss')
            const imageUrl = await uploadImage(file, fileName, 'png')

            if (!imageUrl) {
                return
            }
            // insert
            simpleMde.codemirror.replaceSelection('![](' + imageUrl + ')')
        } else {
            alert('not image')
        }
    }

    let simpleMde: EasyMDE
    const getInstance = (instance: EasyMDE) => {
        simpleMde = instance
    }

    return (
        <>
            <form onSubmit={() => false}>
                <FormGroup>
                    <Input
                        type="text"
                        name="title"
                        value={form.title}
                        placeholder="Title"
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <CategoryWrapper>
                        {props.categories?.map((data) => {
                            const categoryTable = []
                            categoryTable.push(
                                <p>
                                    <input
                                        type="radio"
                                        name="categoryId"
                                        value={data._id}
                                        onChange={handleInputChange}
                                    />
                                    {data.categoryName}
                                </p>
                            )
                            data.chiledCategory?.forEach((sub) => {
                                categoryTable.push(
                                    <p>
                                        <input
                                            type="radio"
                                            name="categoryId"
                                            value={sub._id}
                                            onChange={handleInputChange}
                                        />
                                        - {sub.categoryName}
                                    </p>
                                )
                            })
                            return categoryTable
                        })}
                    </CategoryWrapper>
                </FormGroup>

                <SimpleMDE
                    getMdeInstance={getInstance}
                    value={form.text}
                    id="simple-mde"
                    onChange={(e) => changeText(e)}
                    events={{ drop: handleDrop, paste: handlePaste }}
                />
                <Input type="hidden" name="text" value={form.text} />
            </form>
            <ButtonWrapper>
                <Button type="button" onClick={postArticle}>
                    Submit
                </Button>
            </ButtonWrapper>
        </>
    )
}
export default PostArticle
