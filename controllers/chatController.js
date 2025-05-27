import Chat from '../models/chatschema.js';

export const sendMessage = async (req, res) => {
  const { from, to, message } = req.body;
  try {
    const chat = new Chat({ from, to, message });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getMessages = async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await Chat.find({
      $or: [
        { from: user1, to: user2 },
        { from: user2, to: user1 }
      ]
    }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
