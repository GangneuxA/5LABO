const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [{
        role: {
            type: String,
            enum: ['system', 'user', 'assistant'],
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true, minimize: false });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
