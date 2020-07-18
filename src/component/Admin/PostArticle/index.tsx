import React, { useEffect, useState } from "react";

import { postArticleApi } from "src/infra/article/postArticle/api";
import PostArticleResponse from "src/infra/article/postArticle/response";
import PostArticleRequest from "src/infra/article/postArticle/request";

import { uploadImageApi } from "src/infra/image/api";

import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import marked from "marked";
import highlight from 'highlightjs';

import styled from "styled-components";
import { useRouter } from 'next/router'
import moment from "moment";
import PostImageResponse from "src/infra/image/response";

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
`;

const LabelDanger = styled.span`
    background-color: #d9534f;
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
`;
const Input = styled.input`
    display: block;
    width: 100%;
    height: 18px;
`;

marked.setOptions({
    highlight: (code, lang) => {
        return "<code class=\"hljs\">" + highlight.highlightAuto(code, [lang]).value + "</code>";
    }
});

interface Form {
    title: string,
    description: string,
    text: string
}

interface Image {
    file: File,
    fileType: string,
    fileName: string
}

function validateRequired(value: string) {
    return value === '';
}

const PostArticle = () => {
    const router = useRouter();
    const [form, setForm] = useState<Form>({
        title: '',
        description: '',
        text: '',
    })

    const postArticle = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            const titleErrors = validateRequired(form.title);
            const descriptionErrors = validateRequired(form.description);
            const textErrors = validateRequired(form.text);

            if (titleErrors || descriptionErrors || textErrors) {
                throw new Error('required')
            }

            const request = new PostArticleRequest(
                form.title,
                form.description,
                marked(form.text)
            )
            const response: PostArticleResponse | undefined = await postArticleApi(request);

            router.push(`/post/${response.id}`)
        } catch (error) {
            alert(error.message);
        }
    }

    const uploadImage = async (file: any, fileName: string, type: string): Promise<string | undefined> => {
        try {
            const postImageResponse: PostImageResponse = await uploadImageApi(file, fileName + `.${type}`);
            return postImageResponse.imageUrl
        } catch (error) {
            alert('Failed upload image');
        }
    }

    const changeText = (text: string) => {
        setForm({
            ...form,
            text: text,
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        setForm({
            ...form,
            [target.name]: target.value,
        })
    }

    const handleDrop = async (data: string, e: any) => {
        if (e.dataTransfer?.files.length === 0) {
            return;
        } else {
            e.preventDefault();
        }
        const files = e.dataTransfer?.files;
        const file = files[0];

        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif') {
            let type: string;
            switch (file.type) {
                case 'image/png':
                    type = 'png'
                    break;
                case 'image/jpeg':
                    type = 'jpg'
                    break;
                case 'image/gif':
                    type = 'gif'
                    break;
                default:
                    type = ''
            }

            const fileName = moment().format('YYYYMMDDHHmmss');
            const imageUrl = await uploadImage(file, fileName, type);

            if (!imageUrl) {
                return;
            }
            // insert
            simpleMde.codemirror.replaceSelection('![](' + imageUrl + ')')
        } else {
            alert('not image');
        }
    }

    const handlePaste = async (data: any, e: any) => {
        if (e.clipboardData?.files === undefined || e.clipboardData?.files.length === 0) {
            return;
        } else {
            e.preventDefault()
        }
        const files: FileList = e.clipboardData.files;
        const file = files[0];

        // クリップボード経由のため、画像であればimage/png
        if (file.type === 'image/png') {
            const fileName = moment().format('YYYYMMDDHHmmss');
            const imageUrl = await uploadImage(file, fileName, 'png');

            if (!imageUrl) {
                return;
            }
            // insert
            simpleMde.codemirror.replaceSelection('![](' + imageUrl + ')')
        } else {
            alert('not image');
        }
    }

    let simpleMde: EasyMDE;
    const getInstance = (instance: EasyMDE) => {
        simpleMde = instance;
    };

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
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="description">
                        <LabelDanger>Require</LabelDanger>
                        description
                    </Label>
                    <Input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="text">
                        <LabelDanger>Require</LabelDanger>
                        text
                    </Label>
                    <Input
                        type="hidden"
                        name="text"
                        value={form.text}
                    />

                    <SimpleMDE getMdeInstance={getInstance} value={form.text} id="simple-mde" onChange={(e) => changeText(e)} events={{ 'drop': handleDrop, 'paste': handlePaste }} />
                </FormGroup>
            </form>
            <button type="button" onClick={postArticle}>
                Submit
            </button>
        </>
    );
};
export default PostArticle;