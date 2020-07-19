import React, { useState } from 'react'

// api
import { editArticleApi } from 'src/infra/article/editArticle/api'
import EditArticleRequest from 'src/infra/article/editArticle/request'
import { deleteArticleApi } from 'src/infra/article/deteleArticle/api'
import { uploadImageApi } from 'src/infra/image/api'

import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

import styled from 'styled-components'
import { useRouter } from 'next/router'
import moment from 'moment'
import PostImageResponse from 'src/infra/image/response'
import { ArticleProps } from 'src/interface/articleProps'
import DeleteArticleRequest from 'src/infra/article/deteleArticle/request'
import DeleteArticleResponse from 'src/infra/article/deteleArticle/response'

const FormGroup = styled.div`
    margin-bottom: 15px;
`

const Label = styled.label`
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
`

const LabelDanger = styled.span`
    background-color: #d9534f;
    display: inline;
    padding: 0.2em 0.6em 0.3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25em;
`
const Input = styled.input`
    display: block;
    width: 100%;
    height: 22px;
`
const Select = styled.select`
    display: block;
    width: 100%;
    height: 22px;
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
  margin-right: 10px;
  
  &:hover {
    background: #f56500;
  }
}
`

const ButtonWrapper = styled.div`
    text-align: right;
`

interface Props {
    article: ArticleProps
}

interface Form {
    title: string
    categoryId: string
    text: string
}

function validateRequired(value: string) {
    return value === ''
}

const EditArticle = (props: Props) => {
    const router = useRouter()
    const [form, setForm] = useState<Form>({
        title: props.article.title,
        text: props.article.text,
        categoryId: props.article.categoryName,
    })
    const articleId = props.article._id

    const editArticle = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            const titleErrors = validateRequired(form.title)
            const textErrors = validateRequired(form.text)

            if (titleErrors || textErrors) {
                throw new Error('required')
            }

            const request = new EditArticleRequest(
                articleId,
                form.title,
                form.text,
                form.categoryId
            )
            await editArticleApi(request)

            // jump article page
            router.push(`/post/${articleId}`)
        } catch (error) {
            alert(error.message)
        }
    }
    const deleteArticle = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            const request = new DeleteArticleRequest(articleId)
            const response:
                | DeleteArticleResponse
                | undefined = await deleteArticleApi(request)

            if (response) {
                router.push('/admin/article')
            }
        } catch (error) {
            // setMessage('Failed to add pet')
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

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
                    <Label htmlFor="title">
                        <LabelDanger>Require</LabelDanger>
                        title
                    </Label>
                    <Input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="text">
                        <LabelDanger>Require</LabelDanger>
                        text
                    </Label>
                    <Input type="hidden" name="text" value={form.text} />

                    <SimpleMDE
                        getMdeInstance={getInstance}
                        value={form.text}
                        id="simple-mde"
                        onChange={(e) => changeText(e)}
                        events={{ drop: handleDrop, paste: handlePaste }}
                    />
                </FormGroup>
            </form>
            <ButtonWrapper>
                <Button type="button" onClick={editArticle}>
                    Update
                </Button>
                <Button type="button" onClick={deleteArticle}>
                    Delete
                </Button>
            </ButtonWrapper>
        </>
    )
}
export default EditArticle
