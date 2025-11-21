import { TodoWithRelations } from "@/app/atom/todo/todo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Card, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteTodo } from "@/app/server-action/todo/deleteTodo";
import ConfirmDialog from "../common/dialog/ConfirmDialog";
import { useState } from "react";
import { useFetchTodos } from "@/hooks/todo/useFetchTodos";

interface TodoSheetProps {
  children: React.ReactNode;
  todo: TodoWithRelations;
}

const TodoSheet = ({ children, todo }: TodoSheetProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isDeleting,setIsDeleting] = useState(false);
  const {fetchTodos} = useFetchTodos()

  const handleDelete = async (todoId: string) => {
    setIsDeleting(true);
    try {
      const response = await deleteTodo(todoId);

      if (response.success) {
        toast.success(response.message);
        setSheetOpen(false);
        await fetchTodos();
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo.");
    } finally {
        setIsDeleting(false);
        setConfirmOpen(false);
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="p-4">
        <SheetHeader className="p-0 pb-4 sticky top-0">
          <SheetTitle>{todo.title}</SheetTitle>
          <SheetDescription>{todo.summary}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
          {todo.startDate || todo.endDate ? (
            <div className="flex flex-col gap-2 text-sm">
              <span>
                開始日:
                {todo.startDate
                  ? format(todo.startDate, "yyyy/MM/dd")
                  : "未設定"}
              </span>
              <span>
                終了日:
                {todo.endDate ? format(todo.endDate, "yyyy/MM/dd") : "未設定"}
              </span>
            </div>
          ) : null}

          {todo.checklists.length > 0 && (
            <Card className="p-4 flex flex-col gap-3">
              <h3 className="font-semibold">チェックリスト</h3>
              <ul className="flex flex-col gap-3">
                {todo.checklists.map((checklist) => (
                  <li key={checklist.title} className="flex items-center gap-2">
                    <Checkbox
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                      id={checklist.title}
                      checked={checklist.completed}
                    />
                    <Label htmlFor={checklist.title}>{checklist.title}</Label>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {todo.memos.length > 0 && (
            <div>
              <h3 className="font-semibold">メモ一覧</h3>
              {todo.memos.map((memo) => (
                <Card
                  key={memo.content}
                  className="p-4 max-h-[120px] overflow-y-auto"
                >
                  <CardDescription>{memo.content}</CardDescription>
                </Card>
              ))}
            </div>
          )}
        </div>
        <SheetFooter className="w-80 bg-slate-50 sticky bottom-0 right-0 -mx-4 -mb-4 ">
          <div className="flex gap-2 w-full">
            <Button variant={"secondary"} className="flex-1 bg-yellow-300">
              編集
            </Button>
            <ConfirmDialog
              open={confirmOpen}
              setOpen={setConfirmOpen}
              title={todo.title}
              description="本当にこのTodoを削除しますか？この操作は元に戻せません。"
              onClick={() => handleDelete(todo.id)}
            >
              <Button variant={"destructive"} className="flex-1">
                {isDeleting ? "削除中..." : "削除"}
              </Button>
            </ConfirmDialog>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TodoSheet;
