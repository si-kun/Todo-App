import { Checklist, Memo, Todo } from "@prisma/client";
import { atom } from "jotai";

export interface TodoWithRelations extends Todo {
    checklists: Checklist[];
    memos: Memo[];
}

export const todosAtom = atom<TodoWithRelations[]>([]);