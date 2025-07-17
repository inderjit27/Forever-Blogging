const mongoose = require('mongoose')
const { Schema } = mongoose;

const blogModel = new mongoose.Schema({

    blog_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    banner: { type: String },
    banner_public_id: { type: String },
    description: { type: String },
    content: { type: [] },
    tags: { type: [String] },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'user' },

    activity: {
        total_likes: { type: Number, default: 0 },
        total_comments: { type: Number, default: 0 },
        total_reads: { type: Number, default: 0 },
        total_parent_comment: { type: Number, default: 0 }
    },

    comments: {
        type: [Schema.Types.ObjectId], ref: 'comment'
    },

    draft: { type: Boolean, default: false }

},
    {
        timestamps: { createdAt: 'publishedAt' }
    }
)

module.exports = mongoose.model('blog',blogModel)