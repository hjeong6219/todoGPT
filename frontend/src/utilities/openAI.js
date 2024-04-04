export const chatCompletion = async (editor, setDebouncedContent) => {
  let prompt = editor.getHTML();
  if (prompt === "<p></p>") {
    prompt = "";
  }
  // console.log(prompt);
  let message;
  if (prompt === "") {
    message = {
      role: "system",
      content: "Hello, I'm your personal assistant. How can I help you today?",
    };
  } else {
    message = {
      role: "assistant",
      content: `Following is the prompt from the user:
      ${prompt}
      You can select any of the following actions:
      1. Continue writing the content.
      2. Generate a todo list based on the content.
      3. Summarize the content.
      4. Pick a topic for the user if nothing is prompted.
      Follow the below criteria for the response:
      1. Do not repeat information that is already given in the prompt and introduce a new topic instead. Do not repeatedly give same recommendations.
      2. If the user doesn't prompt for a topic, pick a topic and give recommendations.
      3. Try to include action items in bullets.
      4. To create a checklist, the format is as follows: <ul data-type="taskList"><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>item 1</p></div></li><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>item 2</p></div></li><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>item 3</p></div></li></ul>
      4. Increase the scope of topics other than mental well being
      5. The response should use <p> tag for the content.
      6. If the response contains a list, create an unordered list with each item in a <li>. Creating a list is not mandatory.
      7. Please try to keep the answer under 100 words if possible.
      `,
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
    // console.log(newContent);

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
          // console.log(newContent);

          editor.commands.setContent(newContent);

          setDebouncedContent(newContent);
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const weatherAdvisor = async (data, setContent) => {
  let message = {
    role: "assistant",
    content: `You are an AI assistant that is going to give a useful tip to the user.
      Always round up the temperature to the tenth degree and refrain from mentioning the user's location or coordinates.
      The temperature is in Celsius. Please give an advice accordingly to the given object in one sentence such as what to wear,
      what activities are good for the weather, and etc:
      ${data}`,
  };

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

          setContent(newContent);
        }
      }
      // add api to add the content to the database. may want to add it to the user schema
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
