import { setTodo } from "@/app/features/todo/todoSlice";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Post from "../todo/Post";
import { useDispatch } from "react-redux";
import {
  useAddTodoMutation,
  useUpdateTodoMutation,
} from "@/app/features/todo/todosApi";
import ToggleInput from "./ToggleInput";
import { useAddChatMutation } from "@/app/features/chat/chatApi";

function KanbanBoard({ user, todos, handleShowTodo }) {
  // This function is required to fix the bug within react-beautiful-dnd
  // where the draggable element is not draggable after clicking and throw an error
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  const dispatch = useDispatch();

  const [addTodoApi, { data: addTodoApiData, error: addTodoError }] =
    useAddTodoMutation();

  const [updateTodo, { data: updateTodoData, error: updateTodoError }] =
    useUpdateTodoMutation();

  const [addChat, { data: addChatData, error: addChatError }] =
    useAddChatMutation();

  const handleAddNewTodo = async (columnId, inputValue) => {
    let status = "";
    switch (columnId) {
      case "column1":
        status = "notStarted";
        break;
      case "column2":
        status = "inProgress";
        break;
      case "column3":
        status = "completed";
        break;
    }
    try {
      const addTodoResponse = await addTodoApi({
        userId: user._id,
        title: inputValue,
        userEmail: user.email,
        status: status,
      });
      if (addTodoResponse) {
        try {
          const addChatResponse = await addChat({
            todoId: addTodoResponse.data._id,
            sender: "ai",
            content: "Hi there! How can I help you?",
          });
          handleShowTodo(addTodoResponse.data);
        } catch (error) {
          console.error("Failed to add chat", error);
        }
      }
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Do nothing if dropped onto the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = todos.find(
      (column) => column.id === source.droppableId
    );
    const finishColumn = todos.find(
      (column) => column.id === destination.droppableId
    );
    // Reordering the same column
    if (startColumn === finishColumn) {
      const newTodos = Array.from(startColumn.todos);
      const [removed] = newTodos.splice(source.index, 1);
      newTodos.splice(destination.index, 0, removed);

      // dispatch(
      //   setTodo(
      //     todos.map((column) =>
      //       column.id === startColumn.id
      //         ? { ...column, todos: newTodos }
      //         : column
      //     )
      //   )
      // );
    } else {
      // Moving from one column to another
      const startTodos = Array.from(startColumn.todos);
      const [removed] = startTodos.splice(source.index, 1);

      const finishTodos = Array.from(finishColumn.todos);
      finishTodos.splice(destination.index, 0, removed);

      if (destination.droppableId === "column3") {
        updateTodo({
          _id: draggableId,
          status: "completed",
        });
      } else if (destination.droppableId === "column2") {
        updateTodo({
          _id: draggableId,
          status: "inProgress",
        });
      } else if (destination.droppableId === "column1") {
        updateTodo({
          _id: draggableId,
          status: "notStarted",
        });
      }

      // Update the todos in the Redux store
      // by dispatching the setTodos action with the updated todos
      dispatch(
        setTodo(
          todos.map((column) => {
            if (column.id === startColumn.id) {
              return { ...column, todos: startTodos };
            } else if (column.id === finishColumn.id) {
              return { ...column, todos: finishTodos };
            } else {
              return column;
            }
          })
        )
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isBrowser ? (
        <div className="relative grid grid-cols-1 gap-5 p-4 my-4 bg-white border-2 rounded shadow-lg border-gray-50 md:p-6 max-w-screen-2xl md:grid-cols-3">
          <div className="absolute top-0 right-0 p-4">
            <label htmlFor="status-filter" className="mr-2">
              Filter by status:{" "}
            </label>
            <select id="status-filter">
              <option value="all">All</option>
              <option value="notStarted">Not Started</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {todos.map((column) => (
            <div key={column.id} className="flex flex-col h-full">
              <h3 className="pb-3 font-bold md:text-xl">{column.title}</h3>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    className="flex-grow min-h-[50px] select-none mb-3"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div
                      className={`flex-grow min-h-10px no-scrollbar overflow-auto p-2 rounded ${
                        snapshot.isDraggingOver
                          ? "bg-blue-200 border-2 border-blue-300"
                          : "bg-white"
                      }`}
                    >
                      {column.todos.map((todo, index) => (
                        <Draggable
                          key={todo._id}
                          draggableId={todo._id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3  bg-white rounded shadow border-2 border-gray-100 ${
                                snapshot.isDragging
                                  ? "scale-105 ring-2 ring-blue-300"
                                  : "scale-100"
                              } hover:shadow-md hover:-translate-y-1`}
                            >
                              <Post
                                todo={todo}
                                handleShowTodo={handleShowTodo}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
              <ToggleInput onAddTodo={handleAddNewTodo} columnId={column.id} />
            </div>
          ))}
        </div>
      ) : null}
    </DragDropContext>
  );
}

export default KanbanBoard;
