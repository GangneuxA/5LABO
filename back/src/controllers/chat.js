const Chat = require('../models/chat');
const axios = require("axios");


class ChatController {
// Get chat by ID
async getChatById(req, res) {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async getAllChatsByUserId(req, res){
    try {
        const chats = await Chat.find({ user: req.auth.user._id });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async createChat(req, res) {
    try {
        const chat = new Chat({ user: req.auth.user._id });
        await chat.save();
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


async sendChat(req, res) {
    try {
        const chatId = req.params.id;
        const { model, message } = req.body;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        chat.messages.push({ role: 'user', content: message });
        
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: model,
              messages: chat.messages,
            },
            {
              headers: {
                Authorization: `Bearer ${req.auth.user.apikey}`,
                "Content-Type": "application/json",
              },
            }
          );


        chat.messages.push({ role: 'assistant', content: response.data.choices[0].message.content });
        await chat.save();

        res.status(200).json({ response: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async deleteChat(req, res) {
    try {
        const chat = await Chat.findByIdAndDelete(req.params.id);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
}
module.exports = ChatController;