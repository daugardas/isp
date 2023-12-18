"use client";
import { useState } from "react";
import { DestomaKalba } from "@prisma/client";

interface ModuleProps {
  moduliai: {
    id: number;
    pavadinimas: string;
    aprasymas: string;
    kalba: DestomaKalba;
    kreditai: number;
    kryptisId: number;
    destytojasId: number | null;
  }[];
}

export default function ChatGptForm({ moduliai }: ModuleProps) {
  const fixedInput = `Sugeneruok ${moduliai[0].pavadinimas} aprašymą, iki 30 žodžių`;

  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Labas, aš esu Chat Gpt API botas, kuo galiu šiandien jums padėti?",
    },
  ]);

  const callGetResponse = async () => {
    if (buttonClicked) {
      return; // If the button has already been clicked, do nothing
    }

    setIsLoading(true);
    setButtonClicked(true);

    try {
      // Clone the messages array
      let temp = [...messages];

      // Push the user's message to the cloned array
      temp.push({ role: "user", content: fixedInput });
      setMessages(temp);

      console.log("Calling OpenAI...");

      const response = await fetch("/api/chat_gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: temp }),
      });

      const data = await response.json();
      const message = data; // Assume the response is a string

      console.log("OpenAI replied...", message);

      // Update state with the assistant's message
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: message },
      ]);

      setIsLoading(false);
    } catch (error:any) {
      if (error.code === "insufficient_quota") {
        console.error("Rate limit exceeded. Please try again later.");
      } else {
        console.error("An unexpected error occurred:", error);
      }
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-5">
      <h1 className="text-5xl font-sans">Chat GPT API</h1>

      <div className="flex  h-[35rem] w-[40rem] flex-col items-center bg-gray-600 rounded-xl">
        <div className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
          {messages.map((e, index) => (
            <div
              key={index}
              className={`w-max max-w-[18rem] rounded-md px-4 py-3 h-min ${
                e.role === "assistant"
                  ? "self-start  bg-gray-200 text-gray-800"
                  : "self-end  bg-gray-800 text-gray-50"
              }`}
            >
              {e.content}
            </div>
          ))}

          {isLoading && (
            <div className="self-start bg-gray-200 text-gray-800 w-max max-w-[18rem] rounded-md px-4 py-3 h-min">
              *Galvoja*
            </div>
          )}
        </div>
        <div className="relative  w-[80%] bottom-4 flex justify-center">
          <button
            onClick={callGetResponse}
            className={`w-[100%] bg-blue-500 px-4 py-2 rounded-r ${
              buttonClicked ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Generuoti aprašą
          </button>
        </div>
      </div>

      <div></div>
    </main>
  );
}