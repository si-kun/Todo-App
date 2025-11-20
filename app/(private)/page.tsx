"use client";

import { useEffect, useState } from "react";
import TodoCard from "./components/TodoCard";
import { useFetchTodos } from "@/hooks/todo/useFetchTodos";
import Loading from "@/components/common/loading/Loading";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isSameDay, isWithinInterval } from "date-fns";
import SearchArea from "@/components/common/search/SearchArea";
import { Priority, Status } from "@prisma/client";
import { TodoWithRelations } from "../atom/todo/todo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import SelectYearMonth from "@/components/common/date/SelectYearMonth";
import { Input } from "@/components/ui/input";

export interface FilterOption {
  label: string;
  value: string;
}

export type FilterLabelOptions = Record<string, FilterOption[]>;

export default function Home() {
  const { fetchTodos, loading, todos } = useFetchTodos();

  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "ALL">("ALL");
  const [completeFilter, setCompleteFilter] = useState<
    "ALL" | "true" | "false"
  >("ALL");

  const date = new Date();
  const [year, setYear] = useState<string>(date.getFullYear().toString());
  const [month, setMonth] = useState<string>(
    (date.getMonth() + 1).toString().padStart(2, "0")
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const applyFilters = (todoList: TodoWithRelations[]) => {
    return todoList.filter((todo) => {
      // ステータスフィルター
      if (statusFilter !== "ALL" && todo.status !== statusFilter) {
        return false;
      }
      // 重要度フィルター
      if (priorityFilter !== "ALL" && todo.priority !== priorityFilter) {
        return false;
      }
      // 進捗フィルター
      if (completeFilter !== "ALL") {
        const isCompleted = completeFilter === "true";
        if (todo.completed !== isCompleted) {
          return false;
        }
      }

      // キーワード検索フィルター
      if (searchKeyword !== "") {
        const keyword = searchKeyword.toLowerCase().trim();
        const titleMatch = todo.title.toLowerCase().includes(keyword);
        const summaryMatch = todo.summary?.toLowerCase().includes(keyword);

        if (!titleMatch && !summaryMatch) {
          return false;
        }
      }

      // 年月フィルター(開始日 OR 終了日)
      if (year && month) {
        let matchesYearMonth = false;

        // 開始日をチェック
        if (todo.startDate) {
          const startDate = new Date(todo.startDate);
          const startYear = startDate.getFullYear().toString();
          const startMonth = (startDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");

          if (startYear === year && startMonth === month) {
            matchesYearMonth = true;
          }
        }

        // 終了日をチェック
        if (todo.endDate) {
          const endDate = new Date(todo.endDate);
          const endYear = endDate.getFullYear().toString();
          const endMonth = (endDate.getMonth() + 1).toString().padStart(2, "0");

          if (endYear === year && endMonth === month) {
            matchesYearMonth = true;
          }
        }

        if (!matchesYearMonth) {
          return false;
        }
      }

      return true;
    });
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }
  const todayTodo = todos.filter((todo) => {
    const today = new Date();
    const startDate = todo.startDate ? new Date(todo.startDate) : null;
    const endDate = todo.endDate ? new Date(todo.endDate) : null;

    // 今日開始
    const isTodayStart = startDate && isSameDay(startDate, today);
    // 今日締め切り
    const isTodayEnd = endDate && isSameDay(endDate, today);
    // 期間内
    const isInPeriod =
      startDate &&
      endDate &&
      isWithinInterval(today, { start: startDate, end: endDate });

    return isTodayStart || isTodayEnd || isInPeriod;
  });
  const InProgressTodo = todos.filter((todo) => todo.status === "IN_PROGRESS");

  const filterOption: FilterLabelOptions = {
    ステータス: [
      { label: "未着手", value: "TODO" },
      { label: "実行中", value: "IN_PROGRESS" },
      { label: "完了", value: "DONE" },
      { label: "保留", value: "ON_HOLD" },
    ],
    重要度: [
      { label: "低", value: "LOW" },
      { label: "中", value: "MEDIUM" },
      { label: "高", value: "HIGH" },
      { label: "緊急", value: "EMERGENCY" },
    ],
    進捗: [
      { label: "完了", value: "true" },
      { label: "未完了", value: "false" },
    ],
  };
  return (
    <div>
      <Tabs defaultValue="today">
        <div className="flex flex-col sticky top-16 z-10 bg-slate-50 -mx-4 -mt-4 p-4">
          <TabsList className="">
            <TabsTrigger value="today">今日のTodo</TabsTrigger>
            <TabsTrigger value="in_progress">実行中のTodo</TabsTrigger>
            <TabsTrigger value="todos">全てのTodo</TabsTrigger>
          </TabsList>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="flex items-center gap-3">
                  <Search />
                  フィルター検索
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <SelectYearMonth
                  setYear={setYear}
                  setMonth={setMonth}
                />
                <Input
                  placeholder="キーワード検索"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <div className="flex justify-between">
                  <SearchArea
                    groupLabel={"ステータス"}
                    options={filterOption["ステータス"]}
                    onChange={(value) =>
                      setStatusFilter(value as Status | "ALL")
                    }
                  />
                  <SearchArea
                    groupLabel={"重要度"}
                    options={filterOption["重要度"]}
                    onChange={(value) =>
                      setPriorityFilter(value as Priority | "ALL")
                    }
                  />
                  <SearchArea
                    groupLabel={"進捗"}
                    options={filterOption["進捗"]}
                    onChange={(value) =>
                      setCompleteFilter(value as "ALL" | "true" | "false")
                    }
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <TabsContent value="today" className="flex flex-col gap-4">
          {applyFilters(todayTodo).map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </TabsContent>
        <TabsContent value="in_progress" className="flex flex-col gap-4">
          {applyFilters(InProgressTodo).map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </TabsContent>
        <TabsContent value="todos" className="flex flex-col gap-4">
          {applyFilters(todos).map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
