export type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

export type ChatRequestBody = {
  model: string;
  messages: ChatMessage[];
};

export type ChatResponseBody = {
  model: string;
  total_duration: number;
  message: ChatMessage;
};
