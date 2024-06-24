"use client";

import { useChat } from "ai/react";
import InputForm from "./input-form";
import Messages from "./messages";

export default function ChatBot() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
      useChat({
        api: "api/genai",
      });
  
    return (
      <main 
        className="flex min-h-screen max-h-0 flex-col items-center p-10 text-lg">
        <InputForm
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
        />
        <Messages messages={messages} isLoading={isLoading} />
      </main>
    );
  }