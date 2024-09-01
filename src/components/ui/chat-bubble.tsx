"use client";

import React from "react";

interface ChatBubbleProps {
  message: string;
}

export function UserChatBubble(props: ChatBubbleProps) {
  return (
    <div className="mb-4 flex justify-end">
      <div className="max-w-[90%] rounded-lg bg-primary p-3 text-primary-foreground sm:max-w-[70%]">
        {props.message}
      </div>
    </div>
  );
}

export function AssistantChatBubble(props: ChatBubbleProps) {
  return (
    <div className="mb-4 flex justify-start">
      <div className="max-w-[90%] rounded-lg bg-secondary p-3 sm:max-w-[70%]">
        {props.message}
      </div>
    </div>
  );
}
