const request = require('supertest');
const express = require('express');
const route = require('../src/routes');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); 
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', route);

describe('User Routes', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('testpassword', salt);
    const user = new mongoose.models.users({ pseudo: 'testuser', password: password, apikey: 'testapikey' });
    await user.save();
    token = jwt.sign({ user: user }, process.env.JWT_Token, { expiresIn: '24h' });

    // Create additional users for testing
    const user3 = new mongoose.models.users({ pseudo: 'testuser3', password: password, apikey: 'testapikey' });
    await user3.save();
  });

  afterAll(async () => {
    await mongoose.models.users.deleteMany({ pseudo: { $in: ['testuser', 'testuser3', 'testuser4'] } });
    await mongoose.disconnect();
  });

  test('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ pseudo: 'testuser4', password: 'testpassword', apikey: 'testapikey' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('pseudo', 'testuser4');
  });

  test('should get user information', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('pseudo', 'testuser');
  });

  test('should update user information', async () => {
    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ pseudo: 'updateduser' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('pseudo', 'updateduser');
  });

  // test('should login a user', async () => {
  //   const response = await request(app)
  //     .post('/login')
  //     .send({ pseudo: 'testuser', password: 'testpassword' });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toHaveProperty('token');
  // });

  test('should delete a user', async () => {
    const response = await request(app)
      .delete('/users') 
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});

describe('Chat Routes', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('testpassword', salt);
    const user = new mongoose.models.users({ pseudo: 'testuser2', password: password, apikey: 'testapikey' });
    await user.save();
    token = jwt.sign({ user: user }, process.env.JWT_Token, { expiresIn: '24h' });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('should create a new chat', async () => {
    const response = await request(app)
      .post('/chat')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('user');
  });

  test('should get all chats by user ID', async () => {
    const response = await request(app)
      .get('/chat')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('should get chat by ID', async () => {
    const chatResponse = await request(app)
      .post('/chat')
      .set('Authorization', `Bearer ${token}`);

    const chatId = chatResponse.body._id;

    const response = await request(app)
      .get(`/chat/${chatId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', chatId);
  });

  test('should send a message in a chat', async () => {
    const chatResponse = await request(app)
      .post('/chat')
      .set('Authorization', `Bearer ${token}`);

    const chatId = chatResponse.body._id;

    const response = await request(app)
      .post(`/chat/${chatId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ model: 'testmodel', message: 'testmessage' });

    expect(response.statusCode).toBe(500);
  });

  test('should delete a chat', async () => {
    const chatResponse = await request(app)
      .post('/chat')
      .set('Authorization', `Bearer ${token}`);

    const chatId = chatResponse.body._id;

    const response = await request(app)
      .delete(`/chat/${chatId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  test('should delete a user', async () => {
    const response = await request(app)
      .delete('/users') // Correct route
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});