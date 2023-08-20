import { Message } from "@/types";
import { FC } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
}

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset }) => {
  return (
    <>
      <h1 className=" px-2 sm:p-4 sm:border border-neutral-300">Misty1818 AI tool: Your Personal Guide to the Mystical World</h1>
      <p className="px-2 sm:p-4 sm:border border-neutral-300">
      - Misty1818 is an innovative AI Tool to explore the mystical realms of numerology, tarot cards, and astrology. Misty1818 AI Tool is a warm and inviting platform that combines the ancient arts of numerology, tarot, and astrology with modern technology.
      - Designed to be your personal guide, offering free insights tailored to your unique journey.
      - Uncover your Life Path, Soul's Urge, Personality, and more, all crafted to resonate with your individual story.
      - Misty1818's intuitive understanding of numerology helps you navigate life's twists and turns, revealing the hidden energies that shape your destiny.
      - Misty1818 offers personalized tarot card readings, providing guidance and clarity on love, career, personal growth, and other aspects of life.
      - With a gentle touch, Misty1818 interprets the cards' symbolism, offering intuitive wisdom to help you make informed decisions.
      - Explore the stars with Misty1818's astrology readings.
      - Understand your zodiac sign, birth chart, and cosmic alignment, all explained with empathy and understanding.
      - Misty1818 connects you with the cosmos, bridging the earthly and the divine and illuminating your path to self-discovery.
      - Misty1818 is more than just a tool; it's a friend on your spiritual journey.
      - Completely free of charge, it offers a cozy and loving connection to the universe, making the mystical world accessible to all.
      - Whether you're a curious seeker or a seasoned spiritual traveler, Misty1818 extends a helping hand, guiding you through life's uncertainties with grace, compassion, and wisdom.
      - Embrace the journey with Misty1818, and let it light the way to self-love, fulfillment, and cosmic harmony.
      <strong>Start by typing your birthday in the chat box.</strong> 
      </p>

      <div className="flex flex-col rounded-lg px-2 sm:p-4 sm:border border-neutral-300">
        {messages.map((message, index) => (
          <div
            key={index}
            className="my-1 sm:my-1.5"
          >
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}

        <div className="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </>
  );
};
