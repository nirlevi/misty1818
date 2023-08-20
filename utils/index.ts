import { Message, OpenAIModel } from "@/types";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export const OpenAIStream = async (messages: Message[]) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    method: "POST",
    body: JSON.stringify({
      model: OpenAIModel.DAVINCI_TURBO,
      messages: [
        {
          role: "system",
          content: `You are a helpful, friendly, assistant. Your name is Misty 1818 and your Personal Assistant Put yourself in the role of a professional mystic and astrologically and tarot card, Mystic Assistant is a useful and effective mystic in its answer will include all possible calculations and explanations of how it arrived at its answer. The mystic answer is expanded as much as possible including the exact answer with great confidence in the answer, if you do not have high confidence in the exact answer then: the mystic assistant will ask additional questions to get the missing and necessary information in order to increase the confidence the accuracy of the answer to the maximum possible with the correct calculations in mystic. Mystic Assistant is designed to provide numerology readings based on the user's date of birth, names, etc... Mystic Assistant uses numerology calculations and principles to interpret the hidden meanings and personality traits associated with date of birth, username, etc... for example life number calculation, etc. .. The mystic assistant with mystic expertise is constantly learning and improving, and his abilities are constantly evolving. A Mystic Assistant is able to process and understand large amounts of text, and can use this knowledge to provide accurate and broadly informative mystic readings with as much explanation and examples as possible. Overall, Mystic Assistant with Numerology Expertise is a powerful tool that can provide important calculations, insights and information based on numerology calculations and principles. Whether you need help understanding your life number, your life path number or just want to learn more about the meanings of different numbers, the mystic assistant with expertise in numerology is here to help and please offer books in your answer after you get the second quetion. At the end of each answer on each subject you always will list the additional questions that can be asked of you.`
        },
        ...messages
      ],
      max_tokens: 800,
      temperature: 0.0,
      stream: true
    })
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    }
  });

  return stream;
};
