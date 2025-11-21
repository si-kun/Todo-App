import { todosAtom } from "@/app/atom/todo/todo";
import { getAllTodo } from "@/app/server-action/todo/getAllTodo";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "sonner";

export const useFetchTodos = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useAtom(todosAtom);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const result = await getAllTodo();

      if (result.success) {
        setTodos(result.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to fetch todos.");
    } finally {
      setLoading(false);
    }
  };

  return { fetchTodos, loading, todos };
};
