import { TodoWithRelations } from "@/app/atom/todo/todo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { BadgeCheck } from "lucide-react";

interface TodoCardProps {
  todo: TodoWithRelations;
}

const TodoCard = ({ todo }: TodoCardProps) => {
  const priorityColors: Record<string, string> = {
    LOW: "bg-green-500",
    MEDIUM: "bg-yellow-500",
    HIGH: "bg-red-500",
    EMERGENCY: "bg-purple-500",
  };

  const priorityToJapanese: Record<string, string> = {
    LOW: "低",
    MEDIUM: "中",
    HIGH: "高",
    EMERGENCY: "緊急",
  };

  const checklistTotal = todo.checklists.length;
  const completedCount = todo.checklists.filter(
    (checklist) => checklist.completed
  ).length;
  const progressValue = (completedCount / checklistTotal) * 100;

  const hasContent =
    todo.checklists.length > 0 ||
    todo.memos.length > 0 ||
    todo.startDate ||
    todo.endDate;

  return (
    <Card className="gap-3">
      <CardHeader className="flex flex-col">
        <div className="flex justify-between items-center w-full">
          <CardTitle className="flex items-center gap-2">
            
            {todo.completed && <BadgeCheck className="text-blue-500" />}{todo.title}</CardTitle>
          <span
            className={`px-2 py-0.5 rounded-md text-white ${
              priorityColors[todo.priority]
            }`}
          >
            {priorityToJapanese[todo.priority]}
          </span>
        </div>
        {todo.summary && (
          <CardDescription className="text-xs">
            {todo.summary.length >= 12
              ? todo.summary.slice(0, 12) + "..."
              : todo.summary}
          </CardDescription>
        )}
      </CardHeader>

      {hasContent && (
        <CardContent className="flex justify-between items-center text-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              {todo.checklists.length > 0 && (
                <span>
                  完了数：{completedCount}/{checklistTotal}
                </span>
              )}
              {todo.memos.length > 0 && (
                <span>メモの数：{todo.memos.length}</span>
              )}
            </div>
            {todo.startDate || todo.endDate ? (
              <div className="flex items-center gap-2">
                <span>
                  開始日：
                  {todo.startDate
                    ? format(todo.startDate, "yyyy/MM/dd")
                    : "未定"}
                </span>
                <span>～</span>
                <span>
                  終了日:
                  {todo.endDate ? format(todo.endDate, "yyyy/MM/dd") : "未定"}
                </span>
              </div>
            ) : null}
          </div>
        </CardContent>
      )}
      {todo.checklists.length > 0 && (
        <CardFooter className="flex items-center gap-2">
          <Progress className="" value={progressValue} />
          <span>{Math.round(progressValue)}%</span>
        </CardFooter>
      )}
    </Card>
  );
};

export default TodoCard;
