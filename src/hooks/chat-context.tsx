"use client";

import React, { createContext, useCallback, useState } from "react";
import { ReactNode, FC } from "react";
import { ChatRequestBody, ChatResponseBody, ChatMessage } from "@/types/types";

interface ChatContextType {
  messages: ChatMessage[];
  message: string;
  loading: boolean;
  setMessage: (message: string) => void;
  submitMessage: () => void;
  clearAllMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

const initialMessages: ChatMessage[] = [
  { role: "user", content: "can you code?" },
  {
    role: "assistant",
    content:
      "I'd be happy to help with coding. I'm a large language model, so I can understand and generate code in various programming languages.\n" +
      "\n" +
      "What kind of coding do you need help with?\n" +
      "\n" +
      "Do you have a specific problem or project in mind, or would you like me to suggest some examples?",
  },
  {
    role: "user",
    content: "give me a example of infinite loop in python.",
  },
  {
    role: "assistant",
    content:
      "Here is an example of an infinite loop in Python:\n" +
      "```\n" +
      "while True:\n" +
      '    print("Hello, world!")\n' +
      "```\n" +
      'This code will keep printing "Hello, world!" indefinitely until the program is interrupted or terminated.\n' +
      "\n" +
      "In this example, the `while` loop condition is simply `True`, which means the loop will always be true and run forever. The `print` statement inside the loop will execute repeatedly without stopping.\n" +
      "\n" +
      "To exit this infinite loop, you would typically need to manually interrupt the program (e.g., by pressing Ctrl+C in most terminals) or modify the code to add a condition that allows the loop to terminate.\n" +
      "\n" +
      "Note that while infinite loops can be useful for certain purposes (like testing or debugging), they are generally not recommended in production code as they can cause problems and consume system resources.",
  },
  { role: "user", content: "and an example about recursion " },
  {
    role: "assistant",
    content:
      "Here is an example of recursive function in Python:\n" +
      "```python\n" +
      "def factorial(n):\n" +
      "    if n == 0:\n" +
      "        return 1\n" +
      "    else:\n" +
      "        return n * factorial(n-1)\n" +
      "```\n" +
      "This `factorial` function calculates the factorial of a given integer `n`. It uses recursion to achieve this.\n" +
      "\n" +
      "Here's how it works:\n" +
      "\n" +
      "* The base case is when `n` is 0, in which case the function returns 1 (since the factorial of 0 is defined as 1).\n" +
      "* For all other values of `n`, the function calls itself with `n-1` as an argument, and multiplies the result by `n`.\n" +
      "\n" +
      "For example, if we call the function like this: `factorial(4)`, it will execute the following steps:\n" +
      "\n" +
      "1. `factorial(4)` is called, which returns `4 * factorial(3)`\n" +
      "2. `factorial(3)` is called, which returns `3 * factorial(2)`\n" +
      "3. `factorial(2)` is called, which returns `2 * factorial(1)`\n" +
      "4. `factorial(1)` is called, which returns `1 * factorial(0)`\n" +
      "5. `factorial(0)` is called, which returns 1 (base case)\n" +
      "\n" +
      "The function then works its way back up the call stack, multiplying the results together:\n" +
      "\n" +
      "* `4 * (3 * (2 * (1 * 1)))` = 24\n" +
      "\n" +
      "So, the final result of calling `factorial(4)` is 24.\n" +
      "\n" +
      "Recursion can be a powerful tool for solving certain types of problems, but it's also important to use it carefully and avoid infinite recursion, which can cause a stack overflow error.",
  },
  { role: "user", content: "thanks" },
];

const ChatProvider: FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const updateMessages = useCallback((newMessage: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const submitMessage = async () => {
    const newMessage: ChatMessage = {
      role: "user",
      content: message,
    };

    updateMessages(newMessage);
    setLoading(true);

    const request: ChatRequestBody = {
      model: "llama3",
      messages: [...messages, newMessage],
    };

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const res: ChatResponseBody = await response.json();
    updateMessages(res.message);
    setLoading(false);
  };

  const clearAllMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        message,
        loading,
        setMessage,
        submitMessage,
        clearAllMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider, ChatContext };
