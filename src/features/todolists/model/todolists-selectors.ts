import type { TodoList } from '../../../app/App.tsx'
import type { RootState } from '../../../app/store.ts'

export const selectTodolists = (state: RootState): TodoList[] => state.todolists