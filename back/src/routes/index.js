const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const ChatController = require('../controllers/chat');
const auth = require("../middleware/auth");

const userController = new UserController();
const chatController = new ChatController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pseudo:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               apikey:
 *                 type: string
 *                 description: The API key of the user
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 pseudo:
 *                   type: string
 *                   description: The username of the user
 *                 apikey:
 *                   type: string
 *                   description: The API key of the user
 *       '400':
 *         description: Bad request
 */
router.post('/users', userController.create);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user information
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 pseudo:
 *                   type: string
 *                   description: The username of the user
 *                 apikey:
 *                   type: string
 *                   description: The API key of the user
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get('/users', auth, userController.get);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user information
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pseudo:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               apikey:
 *                 type: string
 *                 description: The API key of the user
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 pseudo:
 *                   type: string
 *                   description: The username of the user
 *                 apikey:
 *                   type: string
 *                   description: The API key of the user
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */
router.put('/users', auth, userController.update);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user
 *     tags: 
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 pseudo:
 *                   type: string
 *                   description: The username of the user
 *                 apikey:
 *                   type: string
 *                   description: The API key of the user
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/users', auth, userController.delete);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pseudo:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user ID
 *                     pseudo:
 *                       type: string
 *                       description: The username of the user
 *                     apikey:
 *                       type: string
 *                       description: The API key of the user
 *                 token:
 *                   type: string
 *                   description: The token connection of the user
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /chat:
 *   get:
 *     summary: Get all chats by user ID
 *     tags: 
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Chats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The chat ID
 *                   user:
 *                     type: string
 *                     description: The user ID
 *                   messages:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         role:
 *                           type: string
 *                           description: The sender ID
 *                         content:
 *                           type: string
 *                           description: The message content
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get('/chat', auth, chatController.getAllChatsByUserId);

/**
 * @swagger
 * /chat/{id}:
 *   get:
 *     summary: Get chat by ID
 *     tags: 
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       '200':
 *         description: Chat retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The chat ID
 *                 user:
 *                   type: string
 *                   description: The user ID
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       role:
 *                         type: string
 *                         description: The role ID
 *                       content:
 *                         type: string
 *                         description: The message content
 *       '404':
 *         description: Chat not found
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get('/chat/:id', auth, chatController.getChatById);

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Create a new chat
 *     tags: 
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Chat created successfully
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID
 *               user:
 *                 type: string
 *                 description: The user ID
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       description: The sender ID
 *                     content:
 *                       type: string
 *                       description: The message content
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/chat', auth, chatController.createChat);

/**
 * @swagger
 * /chat/{id}:
 *   post:
 *     summary: Send a message in a chat
 *     tags: 
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 description: The model
 *               message:
 *                 type: string
 *                 description: The message content
 *     responses:
 *       '201':
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: The reponse message
 *       '404':
 *         description: Chat not found
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/chat/:id', auth, chatController.sendChat);

/**
 * @swagger
 * /chat/{id}:
 *   delete:
 *     summary: Delete a chat
 *     tags: 
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       '200':
 *         description: Chat deleted successfully
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID
 *               user:
 *                 type: string
 *                 description: The user ID
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       description: The sender ID
 *                     content:
 *                       type: string
 *                       description: The message content
 *       '404':
 *         description: Chat not found
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.delete('/chat/:id', auth, chatController.deleteChat);

module.exports = router;