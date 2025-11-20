"use client";

import { Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectYearMonthProps {
  setYear: Dispatch<SetStateAction<string>>;
  setMonth: Dispatch<SetStateAction<string>>;
}

const SelectYearMonth = ({ setYear, setMonth }: SelectYearMonthProps) => {
  const currentYear = new Date().getFullYear();
  // 今年から前後何年分表示するか
  const yearRange = 5;
  const years = Array.from(
    { length: yearRange * 2 + 1 },
    (_, i) => currentYear - yearRange + i
  );

  return (
    <div className="flex items-center gap-1">
      <Select onValueChange={(value) => setYear(value)}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="年" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>年</SelectLabel>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}年
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setMonth(value)}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="月" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>月</SelectLabel>
            {Array.from({ length: 12 }, (_, i) => {
              const monthValue = (i + 1).toString().padStart(2, "0");

              return (
                <SelectItem key={i} value={monthValue}>
                  {i + 1}月
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectYearMonth;
