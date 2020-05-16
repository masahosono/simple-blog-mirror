import dbConnect from 'src/util/dbConnect'
import ArticleModel from 'src/model/db/Article'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const article = await ArticleModel.find();
                res.status(200).json({ success: true, body: article })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            const date = new Date();
            try {
                const article = await ArticleModel.create(
                    {
                        ...req.body,
                        date
                    }
                );
                res.status(201).json({ success: true, body: article })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}