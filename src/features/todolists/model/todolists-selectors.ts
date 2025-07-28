import type { RootState } from '@/app/store.ts'
import {TodoList} from "@/features/todolists/model/todolists-reducer.ts";

export const selectTodolists = (state: RootState): TodoList[] => state.todolists