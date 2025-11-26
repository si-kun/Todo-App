"use client";

import { TodoWithRelations } from "@/app/atom/todo/todo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoSchema, todoSchema } from "@/app/types/zod/todoResolver";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Plus, Save, TimerReset, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateTodo } from "@/app/server-action/todo/updateTodo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { createTodo } from "@/app/server-action/todo/createTodo";
import { Priority, Status } from "@prisma/client";

interface TodoFormProps {
  editingTodo?: TodoWithRelations;
}

const TodoForm = ({ editingTodo }: TodoFormProps) => {
  const [addChecklistTitle, setAddChecklistTitle] = useState("");
  const [addMemoContent, setAddMemoContent] = useState("");

  const router = useRouter();

  const defaultTodo: TodoWithRelations = {
    id: crypto.randomUUID(),
    title: '',
    completed: false,
    status: 'TODO' as Status,
    startDate: null,
    endDate: null,
    priority: 'MEDIUM' as Priority,
    summary: '',
    userId: 'dammy-user-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    checklists: [],
    memos: [],
  };

  const todo = editingTodo ?? defaultTodo;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(todoSchema),
    mode: "onBlur",
    defaultValues: {
      todoId: todo.id,
      title: todo.title,
      summary: todo.summary,
      status: todo.status,
      startDate: todo.startDate
        ? format(new Date(todo.startDate), "yyyy-MM-dd")
        : null,
      endDate: todo.endDate
        ? format(new Date(todo.endDate), "yyyy-MM-dd")
        : null,
      priority: todo.priority,
      checklists: todo.checklists,
      memos: todo.memos,
    },
  });

  const onSubmit = async (data: TodoSchema) => {
    try {
      const result = editingTodo ? await updateTodo(data) : await createTodo(data);
      console.log("Result:", result);
      console.log(errors)
      if (result.success) {
        toast.success(result.message);
        router.replace("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("予期しないエラーが発生しました");
    }
  };

  const buttonText = isSubmitting ? (
    <>
      <Spinner />
      保存中
    </>
  ) : isDirty ? (
    <>
      <Save />
      変更を保存する
    </>
  ) : (
    <>
      <Check />
      変更はありません
    </>
  );

  return (
    <form
      className="flex flex-col gap-4 pb-22"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label>タイトル</Label>
        <Input placeholder={"Todoを入力してください"} {...register("title")} />
      </div>
      <div>
        <Label>概要</Label>
        <Input
          placeholder={"Todoを入力してください"}
          {...register("summary")}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-1">
          <Label>ステータス</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                // defaultValue={editingTodo.status}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="status" />
                </SelectTrigger>
                <SelectContent>
                  {todoSchema.shape.status.options.map((status, index) => (
                    <SelectItem key={index} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>重要度</Label>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select
                // defaultValue={editingTodo.priority}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder={"priority"} />
                </SelectTrigger>

                <SelectContent>
                  {todoSchema.shape.priority.options.map((pri) => (
                    <SelectItem key={pri} value={pri}>
                      {pri}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>開始日</Label>
          <div className="flex items-center gap-2">
            <Input type="date" {...register("startDate")} />
            <Button
              type="button"
              variant={"destructive"}
              size={"icon"}
              onClick={() => {
                setValue("startDate", null);
              }}
            >
              <TimerReset />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>終了日</Label>
          <div className="flex items-center gap-2">
            <Input type="date" {...register("endDate")} />
            <Button
              type="button"
              variant={"destructive"}
              size={"icon"}
              onClick={() => {
                setValue("endDate", null);
              }}
            >
              <TimerReset />
            </Button>
          </div>
        </div>
      </div>

      <Controller
        control={control}
        name="checklists"
        render={({ field }) => (
          <Card className="px-2 py-0">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex">
                  チェックリスト ({field.value.length})
                </AccordionTrigger>
                {field.value.map((checklist, index) => (
                  <AccordionContent
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                      id={checklist.title}
                      checked={checklist.completed}
                      onCheckedChange={(checked) => {
                        const newChecklists = [...field.value];
                        newChecklists[index].completed = checked as boolean;
                        field.onChange(newChecklists);
                      }}
                    />
                    <Label htmlFor={checklist.title}>{checklist.title}</Label>
                    <Button
                      type="button"
                      className="ml-auto"
                      variant={"destructive"}
                      size={"icon"}
                      onClick={() => {
                        const newChecklists = field.value.filter(
                          (_, i) => i !== index
                        );
                        field.onChange(newChecklists);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </AccordionContent>
                ))}
                <AccordionContent className="flex items-center pb-2 gap-2">
                  <Input
                    value={addChecklistTitle}
                    onChange={(e) => setAddChecklistTitle(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      if (addChecklistTitle.trim() === "") return;
                      const newChecklists = [
                        ...field.value,
                        { title: addChecklistTitle, completed: false },
                      ];
                      field.onChange(newChecklists);
                      setAddChecklistTitle("");
                    }}
                    variant={"outline"}
                    type="button"
                    className="bg-green-500"
                  >
                    <Plus />
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        )}
      />
      <Controller
        control={control}
        name="memos"
        render={({ field }) => (
          <Card className="px-2 py-0">
            <Accordion type="single" collapsible className="">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  メモ一覧 ({field.value.length})
                </AccordionTrigger>
                {field.value.map((memo, index) => (
                  <AccordionContent
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <Textarea
                      className="text-xs h-20 overflow-y-auto"
                      value={memo.content}
                      onChange={(e) => {
                        const newMemos = [...field.value];
                        newMemos[index].content = e.target.value;
                        field.onChange(newMemos);
                      }}
                    />
                    <Button
                      type="button"
                      variant={"destructive"}
                      size={"icon"}
                      onClick={() => {
                        const newMemos = field.value.filter(
                          (_, i) => i !== index
                        );
                        field.onChange(newMemos);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </AccordionContent>
                ))}
                <AccordionContent className="flex items-center pb-2 gap-2">
                  <Textarea
                    value={addMemoContent}
                    onChange={(e) => setAddMemoContent(e.target.value)}
                    className="h-20 overflow-y-auto text-xs"
                  />
                  <Button
                    onClick={() => {
                      if (addMemoContent.trim() === "") return;
                      const newMemos = [
                        ...field.value,
                        { content: addMemoContent },
                      ];
                      field.onChange(newMemos);
                      setAddMemoContent("");
                    }}
                    variant={"outline"}
                    type="button"
                    className="bg-green-500 h-20"
                  >
                    <Plus />
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        )}
      />
      <div className="fixed bottom-0 w-full left-0 bg-slate-100 h- p-2 flex flex-col gap-2">
        <Button
          disabled={!isDirty || isSubmitting}
          type="submit"
          className="w-full bg-green-500"
        >
          {buttonText}
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          variant={"outline"}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
