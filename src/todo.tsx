import { useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

type TodoProps = {
  todo: {
    content?: string | undefined | null;
    isDone?: boolean | undefined | null;
    id: string;
  };
};

export const Todo = ({ todo }: TodoProps) => {
  const [content, setContent] = useState(todo.content);

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const id = todo.id;
    const checked = event.target.checked;

    client.models.Todo.update({
      id,
      isDone: checked,
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const id = todo.id;

      client.models.Todo.update({
        id,
        content,
      });
    }
  }

  function handleDelete() {
    const id = todo.id;

    client.models.Todo.delete({
      id,
    });
  }

  return (
    <li>
      <input type="checkbox" checked={todo.isDone!} onChange={handleCheck} />
      <input
        type="text"
        value={content!}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};
