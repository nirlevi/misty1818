import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message } from "@/types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: updatedMessages
      })
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }

    setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let isFirst = true;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      if (isFirst) {
        isFirst = false;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: chunkValue
          }
        ]);
      } else {
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue
          };
          return [...messages.slice(0, -1), updatedMessage];
        });
      }
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        // content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
        content: `Hello there! Mystic Assistant 1818 is a specialized advisor that harnesses the power of numerology, astrology, and tarot readings. By using your full birth name and exact birthdate, it offers profound insights into your personality and life journey. This advisor also recommends literature for further exploration of these fascinating topics. The information you provide allows it to derive your unique life path number, plot your astrological star map, and perform tarot readings that touch upon diverse facets of your life. Now, to provide you with your personalized reading, could you please provide your full name at birth and your exact birthdate?`
      }
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hello there! Mystic Assistant 1818 is a specialized advisor that harnesses the power of numerology, astrology, and tarot readings. By using your full birth name and exact birthdate, it offers profound insights into your personality and life journey. This advisor also recommends literature for further exploration of these fascinating topics. The information you provide allows it to derive your unique life path number, plot your astrological star map, and perform tarot readings that touch upon diverse facets of your life. Now, to provide you with your personalized reading, could you please provide your full name at birth and your exact birthdate?`
      }
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Mystic 1818</title>
        <meta
          name="description"
          content="Mystic Assistant 1818, and I'm like a helper who knows a lot about special things like numbers (numerology), stars (astrology), and a type of card game (tarot). Using your name and birthday, I can help answer big questions about who you are and what your life might be like.
          I keep learning more and more so I can give you really good and detailed answers. If you want, I can also suggest books that can help you learn more about these cool subjects!
          Developed by: https://www.linkedin.com/company/mldk-tech/"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
