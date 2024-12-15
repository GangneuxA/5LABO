import React from 'react';

function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Supinfo Project</h1>
      <p>This project is developed as part of a Supinfo course. It aims to replicate a ChatGPT front-end interface.</p>
      <p>Users can register and log in to access the chat functionality. The chat uses the user's API key to interact with various OpenAI models, including GPT-3, which helps in reducing the costs associated with API usage.</p>
      <p>Features include:</p>
      <ul style={{ display: 'inline-block', textAlign: 'left' }}>
        <li>User Registration and Login</li>
        <li>Chat Interface</li>
        <li>User Management</li>
        <li>Support for multiple OpenAI models</li>
      </ul>
      <p>To get started:</p>
      <ol style={{ display: 'inline-block', textAlign: 'left' }}>
        <li>Register a new account or log in if you already have one.</li>
        <li>Navigate to the chat page to start interacting with the OpenAI models.</li>
        <li>Ensure you have your OpenAI API key set up in your account settings.</li>
      </ol>
      <p>We hope you find this project useful and educational!</p>
    </div>
  );
}

export default Home;
