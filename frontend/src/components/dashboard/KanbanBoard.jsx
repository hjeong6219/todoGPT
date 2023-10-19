"use client";
import { useUpdateTodoMutation } from "@/app/features/todo/todosApi";
import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Post from "../todo/Post";

function KanbanBoard({ todos, handleShowTodo }) {
  // This function is required to fix the bug within react-beautiful-dnd
  // where the draggable element is not draggable after clicking and throw an error
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  const [columns, setColumns] = useState(todos);
  const [updateTodo, { data: updateTodoData, error: updateTodoError }] =
    useUpdateTodoMutation();

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

    const startColumn = columns.find(
      (column) => column.id === source.droppableId
    );
    const finishColumn = columns.find(
      (column) => column.id === destination.droppableId
    );
    // Reordering the same column
    if (startColumn === finishColumn) {
      const newTodos = Array.from(startColumn.todos);
      const [removed] = newTodos.splice(source.index, 1);
      newTodos.splice(destination.index, 0, removed);

      setColumns(
        columns.map((column) =>
          column.id === startColumn.id ? { ...column, todos: newTodos } : column
        )
      );
    } else {
      // Moving from one column to another
      const startTodos = Array.from(startColumn.todos);
      const [removed] = startTodos.splice(source.index, 1);

      const finishTodos = Array.from(finishColumn.todos);
      finishTodos.splice(destination.index, 0, removed);

      if (destination.droppableId === "column3") {
        updateTodo({
          _id: draggableId,
          completed: "completed",
        });
      } else if (destination.droppableId === "column2") {
        updateTodo({
          _id: draggableId,
          completed: "inProgress",
        });
      } else if (destination.droppableId === "column1") {
        updateTodo({
          _id: draggableId,
          completed: "notStarted",
        });
      }

      setColumns(
        columns.map((column) => {
          if (column.id === startColumn.id) {
            return { ...column, todos: startTodos };
          } else if (column.id === finishColumn.id) {
            return { ...column, todos: finishTodos };
          } else {
            return column;
          }
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isBrowser ? (
        <div className="grid grid-cols-1 gap-5 p-4 my-4 bg-gray-100 rounded shadow-lg md:p-6 max-w-screen-2xl md:grid-cols-3">
          {columns.map((column) => (
            <div key={column.id}>
              <h3 className="pb-3 font-bold">{column.title}</h3>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    className="min-h-[50px] select-none "
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div
                      className={`flex-grow  min-h-10px overflow-hidden p-2 ${
                        snapshot.isDraggingOver
                          ? "bg-blue-200 border-2 border-blue-300"
                          : "bg-transparent"
                      } rounded`}
                    >
                      {column.todos.map((todo, index) => (
                        <Draggable
                          key={todo._id}
                          draggableId={todo._id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Post
                              todo={todo}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                              snapshot={snapshot}
                              handleShowTodo={handleShowTodo}
                            />
                            // <div
                            //   ref={provided.innerRef}
                            //   {...provided.draggableProps}
                            //   {...provided.dragHandleProps}
                            //   className={`p-3 mb-3 bg-white rounded shadow-lg    ${
                            //     snapshot.isDragging
                            //       ? "scale-105 ring-2 ring-blue-300"
                            //       : "scale-100"
                            //   } hover:shadow-md hover:-translate-y-1`}
                            // >
                            //   {todo.title}
                            // </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      ) : null}
    </DragDropContext>
  );
}

export default KanbanBoard;
