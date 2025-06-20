/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react';
import { useAPI } from './useAPI';

// Define the structure of a message
export interface Message {
  owner: 'user' | 'system';
  text: string;
}

// Define the structure of the API response for a single item
interface ApiResponseItem {
  author: string;
  content: {
    parts: Array<{
      text: string;
    }>;
  };
  // Add other potential properties here if known
  [key: string]: any;
}

export function useChat(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { loading, error, response, callAPI } = useAPI<ApiResponseItem[]>();

  const sendMessage = useCallback(async (newMessageText: string, sessionId: string) => {
    if (!newMessageText.trim() || !sessionId) return;

    // Add user message to the chat
    const userMessage: Message = { owner: 'user', text: newMessageText };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Prepare and make the API call
    await callAPI({
      url: 'http://localhost:8000/run',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        appName: 'git_agent',
        userId: 'u_123', // Placeholder user id
        sessionId: sessionId,
        newMessage: {
          role: 'user',
          parts: [{ text: newMessageText }],
        },
      },
    });
  }, [callAPI]);

  // Handle the API response
  useEffect(() => {
    if (response) {
      const systemResponse = response.find(
        (item) => item.author === 'unit_test_generate_agent'
      );

      if (systemResponse && systemResponse.content?.parts?.[0]?.text) {
        const systemMessage: Message = {
          owner: 'system',
          text: systemResponse.content.parts[0].text,
        };
        setMessages(prevMessages => [...prevMessages, systemMessage]);
      }
    }
  }, [response]);

  return { messages, loading, error, sendMessage };
}
