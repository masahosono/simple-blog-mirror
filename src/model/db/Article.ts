import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
    description: {
        type: String
    },
    text: {
        type: String
    }
})

export default mongoose.models?.Article || mongoose.model('Article', ArticleSchema)