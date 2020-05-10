import dbConnect from 'src/util/dbConnect'
import ArticleModel from 'src/model/db/Article'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const atricle = await ArticleModel.findById(id);
                if (!atricle) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: atricle })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}