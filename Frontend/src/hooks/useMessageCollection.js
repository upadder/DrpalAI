import { useState } from 'react';

/**
 * A custom hook for managing the conversation between the user and the AI.
 *
 * @returns {Object} An object containing the `messages` array and the `addMessage` function.
 */
const useMessageCollection = () => {
  const initialMsg = {
    id: 1,
    createdAt: Date.now(),
    text: "Welcome to our Dr Pal! I'm here to help you access patient data and provide medical insights. Just share patient identifiers like insurance numbers, and I'll fetch the records for you!",
    ai: true,
  };
  const [messages, setMessages] = useState([initialMsg]);

  /**
   * A function for adding a new message to the collection.
   *
   * @param {Object} message - The message to add to the collection.
   */
  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => setMessages([initialMsg]);

  return [messages, addMessage, clearMessages];
};

export default useMessageCollection;