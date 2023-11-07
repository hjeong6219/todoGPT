const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");

const openAiApi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Todos = require("../../models/Todos");

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const todos = await Todos.find({ userId });
    switch (req.query.page) {
      case "board":
        const todoColumns = [
          {
            id: "column1",
            title: "Todo",
            todos: [],
          },
          {
            id: "column2",
            title: "In Progress",
            todos: [],
          },
          {
            id: "column3",
            title: "Completed",
            todos: [],
          },
        ];
        todos.forEach((todo) => {
          switch (todo.completed) {
            case "notStarted":
              todoColumns[0].todos.push(todo);
              break;
            case "inProgress":
              todoColumns[1].todos.push(todo);
              break;
            case "completed":
              todoColumns[2].todos.push(todo);
              break;
            default:
              console.error(
                "Unexpected todo completion status:",
                todo.completed
              );
              break;
          }
        });
        res.json(todoColumns);
        break;
      case "list":
        const sortedTodos = [...todos];
        let start = 0;
        let end = sortedTodos.length - 1;
        while (start < end) {
          while (start < end && !sortedTodos[start].completed) {
            start++;
          }
          while (start < end && sortedTodos[end].completed) {
            end--;
          }
          if (start < end) {
            [sortedTodos[start], sortedTodos[end]] = [
              sortedTodos[end],
              sortedTodos[start],
            ];
          }
        }
        res.json(sortedTodos);
        break;
      case "calendar":
        res.json(todos);
        break;
      default:
        console.error("Unexpected page:", req.query.page);
        break;
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { title, content, createdAt, completed, Progress, category, userId } =
    req.body;

  try {
    // Check if a Todo item with the same title already exists for the user
    const existingTodo = await Todos.findOne({ title, userId });
    if (existingTodo) {
      return res
        .status(400)
        .json({ msg: "Todo item with the same title already exists" });
    }

    // Create a new Todo item if no duplicates are found
    const todo = await Todos.create({
      title,
      content,
      createdAt,
      completed,
      Progress,
      category,
      userId,
    });
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { title, content, createdAt, completed, Progress, category, userId } =
    req.body;
  try {
    const todo = await Todos.findByIdAndUpdate(req.params.id, {
      title,
      content,
      createdAt,
      completed,
      Progress,
      category,
      userId,
    });
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Below code will require a websocket for real-time updates. It currently does not fully work
// as it skips on some of the chunks even with buffers.
// router.put("/:id/openai", async (req, res) => {
//   try {
//     console.log(req.body);
//     const todo = await Todos.findById(req.params.id);
//     if (!req.body.prompt) {
//       return res.status(400).json({ msg: "Prompt is required" });
//     } else if (!todo) {
//       return res.status(404).json({ msg: "Todo not found" });
//     }

//     const stream = await openAiApi.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "assistant", content: req.body.prompt }],
//       max_tokens: 1000,
//       frequency_penalty: 0.5,
//       n: 1,
//       stream: true,
//     });

//     let isSaving = false;
//     let buffer = "";
//     let htmlBuffer = "";
//     let initial = true;

//     const saveTodoContent = async (content) => {
//       if (isSaving) return;
//       isSaving = true;
//       todo.content = initial
//         ? todo.content + " " + content
//         : todo.content + content;
//       initial = false;
//       await todo.save();
//       isSaving = false;
//     };

//     const processBuffer = () => {
//       let jsonMatch;
//       while ((jsonMatch = buffer.match(/^(data: {.*?})(\n|$)/m))) {
//         const jsonString = jsonMatch[1];
//         buffer = buffer.slice(jsonMatch[0].length);

//         try {
//           const content = JSON.parse(jsonString.slice(6)).choices[0].delta
//             .content;
//           // Check if the content is HTML or if it contains an opening or closing HTML tag
//           if (/<|>/.test(content)) {
//             htmlBuffer += content;
//             let tagMatch;
//             while ((tagMatch = htmlBuffer.match(/<[^>]*>/))) {
//               let tag = tagMatch[0];
//               let tagIndex = htmlBuffer.indexOf(tag);

//               if (tag[tag.length - 1] === ">" || tag.startsWith("</")) {
//                 // Complete tag found
//                 let contentToSave = htmlBuffer.slice(0, tagIndex) + tag;
//                 htmlBuffer = htmlBuffer.slice(tagIndex + tag.length);
//                 saveTodoContent(contentToSave);
//               } else {
//                 // It's a partial tag, break and wait for the next chunk to complete it
//                 break;
//               }
//             }
//           } else {
//             // If it is not HTML, just save it directly
//             saveTodoContent(content);
//           }
//         } catch (error) {
//           console.error("Error parsing JSON:", error);
//         }
//       }
//     };

//     stream.response.body.on("data", (chunk) => {
//       buffer += chunk.toString();
//       processBuffer();
//     });

//     stream.response.body.on("end", async () => {
//       if (htmlBuffer.length > 0) {
//         // Any remaining content in the htmlBuffer is likely not valid HTML, or it's incomplete
//         await saveTodoContent(htmlBuffer);
//       }
//       console.log("Stream ended, final content:", todo.content);
//     });

//     stream.response.body.on("error", (error) => {
//       console.error("Stream encountered an error:", error);
//       res.status(500).json({ message: "Stream error" });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todos.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    res.json({ msg: "Todo removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
