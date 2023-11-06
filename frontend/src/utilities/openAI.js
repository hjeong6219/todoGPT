import { DOMParser } from "prosemirror-model";

export const chatCompletion = async (editor, setDebouncedContent) => {
  let prompt = editor.getHTML();
  console.log(prompt);
  let message;
  if (prompt === "<p></p>" || prompt === "") {
    message = {
      role: "system",
      content: "Hello, I'm your personal assistant. How can I help you today?",
    };
  } else {
    message = {
      role: "assistant",
      content: `Please either continue writing or generate a todo based on my prompt in a brief HTML-format: ${prompt}
      The prompt should use <p> tag for the content.
      Also, create an unordered list with each item be in a <li> only if necessary.
      There is no need to repeat the given prompt in the response.
      Please try to keep the answer under 50 words if possible.`,
    };
  }

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [message],
        stream: true,
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let newContent = prompt;
    console.log(newContent);

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      // Massage and parse the chunk of data
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      const parsedLines = lines
        .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
        .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
        .map((line) => JSON.parse(line)); // Parse the JSON string

      for (const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;
        if (content) {
          if (content === " ") {
            newContent += "\n";
          }
          newContent += content;
          console.log(newContent);

          editor.commands.setContent(newContent);

          setDebouncedContent(newContent);
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
