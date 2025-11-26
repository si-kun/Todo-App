"use client";

import { useParams } from "next/navigation";
import TodoForm from "../../components/TodoForm";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getByTodoId } from "@/app/server-action/todo/getByTodoId";
import { TodoWithRelations } from "@/app/atom/todo/todo";

interface ParamsProps extends Record<string, string> {
  id: string;
}

const EditPage = () => {
  const params = useParams<ParamsProps>();
  const id = params.id;
  
  const [editingTodo, setEditingTodo] = useState<TodoWithRelations | null>(null)

  useEffect(() => {
    try {
      const fetchTodo = async () => {
        const result = await getByTodoId(id);

        if (result.success && result.data) {
          toast.success("Todo loaded for editing.");
          setEditingTodo(result.data)
        }
      };
      fetchTodo();
    } catch (error) {
      console.error("Error loading todo for editing:", error);
      toast.error("Failed to load todo for editing.");
    }
  }, [id]);

  if(!editingTodo) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <TodoForm editingTodo={editingTodo} />
    </div>
  );
};

export default EditPage;
