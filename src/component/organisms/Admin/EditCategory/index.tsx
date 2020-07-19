import React, { useState } from 'react'
import styled from 'styled-components'

import CategoryProps from 'src/interface/categoryProps'
import RequiredLabel from 'src/component/atoms/Label'

import { postCategoryApi } from 'src/infra/category/postCategory/api'
import { deleteCategoryApi } from 'src/infra/category/deleteCategory/api'
import PostCategoryRequest from 'src/infra/category/postCategory/request'
import PostCategoryResponse from 'src/infra/category/postCategory/response'
import Modal from 'src/component/molecurels/Modal'
import DeleteCategoryRequest from 'src/infra/category/deleteCategory/request'
import router from 'next/router'
import EditCategoryRequest from 'src/infra/category/editCategory/request'
import { editCategoryApi } from 'src/infra/category/editCategory/api'

const FormGroup = styled.div`
    margin-bottom: 15px;
    padding: 10px;
`

const Input = styled.input`
    display: block;
    width: 100%;
    height: 22px;
`

const CategoryModalContent = styled.div`
    background: #fff;
    left: 50%;
    padding: 40px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
`

const CategoryWrapper = styled.div`
    padding: 10px;
    border-collapse: collapse;
    width: 100%;
    max-width: 500px;
    border: 1px solid #bbb;
`

const Category = styled.p`
    font-size: 18px;
    color: #a5aaaf;
`

const AddCategory = styled.a`
    font-size: 18px;
    color: #a5aaaf;
    :before {
        font-family: 'Font Awesome 5 Free';
        content: '\f055';
        font-weight: 900;
        padding-right: 5px;
    }
`

const EditCategoryInfo = styled.a`
    font-size: 18px;
    color: #a5aaaf;
    :before {
        font-family: 'Font Awesome 5 Free';
        content: '\f044';
        font-weight: 900;
        padding-right: 5px;
    }
`

interface Props {
    categories?: CategoryProps[]
}

enum ModalType {
    NONE,
    ADD_CATEGORY,
    ADD_SUBCATEGORY,
    EDIT_CATEGORY,
    EDIT_SUBCATEGORY,
}

const EditCategory = (props: Props) => {
    const [dispModal, dispModalToggle] = useState({
        type: ModalType.NONE,
        isDisp: false,
    })

    const [form, setForm] = useState({
        _id: '',
        category: '',
        categoryName: '',
        parentId: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        setForm({
            ...form,
            [target.name]: target.value,
        })
    }

    const postCategory = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            const request = new PostCategoryRequest(
                form.category,
                form.categoryName,
                form.parentId
            )
            const response: Promise<
                PostCategoryResponse | undefined
            > = postCategoryApi(request)

            response.then(() => {
                categoryModalClose()
                router.replace('/admin/category')
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const editCategory = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            const request = new EditCategoryRequest(
                form._id,
                form.category,
                form.categoryName,
                form.parentId
            )
            const response:
                | PostCategoryResponse
                | undefined = await editCategoryApi(request)
            categoryModalClose()
            router.replace('/admin/category')
        } catch (error) {
            alert(error.message)
        }
    }

    const deleteCategory = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            const request = new DeleteCategoryRequest(form._id)
            deleteCategoryApi(request)
            categoryModalClose()
            router.replace('/admin/category')
        } catch (error) {
            alert(error.message)
        }
    }

    const categoryModalOpen = (
        modalType: ModalType,
        _id?: string,
        category?: string,
        categoryName?: string,
        parentId?: string
    ) => {
        switch (modalType) {
            case ModalType.ADD_CATEGORY:
                setForm({
                    _id: '',
                    category: '',
                    categoryName: '',
                    parentId: '',
                })
            case ModalType.ADD_SUBCATEGORY:
                console.log(parentId)
                setForm({
                    _id: '',
                    category: category || '',
                    categoryName: categoryName || '',
                    parentId: parentId || '',
                })
            case ModalType.EDIT_CATEGORY:
                setForm({
                    _id: _id || '',
                    category: category || '',
                    categoryName: categoryName || '',
                    parentId: '',
                })
            case ModalType.EDIT_SUBCATEGORY:
                setForm({
                    _id: _id || '',
                    category: category || '',
                    categoryName: categoryName || '',
                    parentId: parentId || '',
                })
        }
        dispModalToggle({ type: modalType, isDisp: true })
    }

    const categoryModalClose = () => {
        dispModalToggle({ type: ModalType.NONE, isDisp: false })
    }

    return (
        <>
            <button
                onClick={() => {
                    categoryModalOpen(ModalType.ADD_CATEGORY)
                }}
            >
                Create Top Level Category
            </button>

            <CategoryWrapper>
                {props.categories?.map((data, index) => {
                    const categoryTable = []
                    categoryTable.push(
                        <Category>
                            {data.categoryName}
                            <AddCategory
                                onClick={() =>
                                    categoryModalOpen(
                                        ModalType.ADD_SUBCATEGORY,
                                        data._id,
                                        '',
                                        '',
                                        data._id
                                    )
                                }
                            ></AddCategory>
                            <EditCategoryInfo
                                onClick={() =>
                                    categoryModalOpen(
                                        ModalType.EDIT_CATEGORY,
                                        data._id,
                                        data.category,
                                        data.categoryName
                                    )
                                }
                            ></EditCategoryInfo>
                        </Category>
                    )
                    data.chiledCategory?.forEach((sub) => {
                        categoryTable.push(
                            <Category>
                                {sub.categoryName}
                                <EditCategoryInfo
                                    onClick={() =>
                                        categoryModalOpen(
                                            ModalType.EDIT_SUBCATEGORY,
                                            sub._id,
                                            data.category,
                                            data.categoryName,
                                            data._id
                                        )
                                    }
                                ></EditCategoryInfo>
                            </Category>
                        )
                    })
                    return categoryTable
                })}
            </CategoryWrapper>

            {dispModal.isDisp && (
                <Modal onClick={categoryModalClose}>
                    <CategoryModalContent>
                        <form onSubmit={() => false}>
                            <FormGroup>
                                <RequiredLabel text="Category" required />
                                <Input
                                    type="text"
                                    name="category"
                                    value={form.category}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <RequiredLabel text="CategoryName" required />
                                <Input
                                    type="text"
                                    name="categoryName"
                                    value={form.categoryName}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </form>

                        {dispModal.type === ModalType.EDIT_CATEGORY ||
                        dispModal.type === ModalType.EDIT_SUBCATEGORY ? (
                            <>
                                <button type="button" onClick={editCategory}>
                                    Edit
                                </button>

                                <button type="button" onClick={deleteCategory}>
                                    Delete
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={postCategory}>
                                Submit
                            </button>
                        )}
                    </CategoryModalContent>
                </Modal>
            )}
        </>
    )
}
export default EditCategory
