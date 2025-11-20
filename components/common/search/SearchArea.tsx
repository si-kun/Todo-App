import { FilterOption } from "@/app/(private)/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchAreaProps {
  groupLabel: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

const SearchArea = ({ groupLabel, options,onChange }: SearchAreaProps) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="min-w-[105px] text-sm">
        <SelectValue placeholder={groupLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{groupLabel}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SearchArea;
