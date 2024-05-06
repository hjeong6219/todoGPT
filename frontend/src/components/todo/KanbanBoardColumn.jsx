import { Droppable, Draggable } from "@hello-pangea/dnd";
import Post from "./Post";
import ToggleInput from "./ToggleInput";

function KanbanBoardColumn({ column, handleShowTodo, handleAddNewTodo }) {
  return (
    <div className="flex flex-col h-full">
      <h3 className="p-3 font-bold md:text-xl">{column.title}</h3>
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
                      className={`p-3 mb-2  bg-white rounded shadow border-2 border-gray-100 ${
                        snapshot.isDragging
                          ? "scale-105 ring-2 ring-blue-300"
                          : "scale-100"
                      } hover:shadow-md hover:-translate-y-1`}
                    >
                      <Post todo={todo} handleShowTodo={handleShowTodo} />
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
  );
}

export default KanbanBoardColumn;
