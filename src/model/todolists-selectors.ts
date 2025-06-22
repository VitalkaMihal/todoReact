import type { TodoList } from '../app/App'
import type { RootState } from '../app/store'

export const selectTodolists = (state: RootState): TodoList[] => state.todolists