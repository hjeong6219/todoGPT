import { setTodo } from "@/app/features/todo/todoSlice";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import {
  useAddTodoMutation,
  useUpdateTodoMutation,
} from "@/app/features/todo/todosApi";
import { useAddChatMutation } from "@/app/features/chat/chatApi";
import { setTodoStatus } from "@/app/features/todo/todoSlice";
import StatusFilter from "./StatusFilter";
import KanbanBoardColumn from "./KanbanBoardColumn";

function KanbanBoard({ user, todos, handleShowTodo }) {
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
          <StatusFilter setTodoStatus={setTodoStatus} />
          {todos.map((column) => (
            <KanbanBoardColumn
              key={column.id}
              column={column}
              handleShowTodo={handleShowTodo}
              handleAddNewTodo={handleAddNewTodo}
            />
          ))}
        </div>
      ) : null}
    </DragDropContext>
  );
}

export default KanbanBoard;
