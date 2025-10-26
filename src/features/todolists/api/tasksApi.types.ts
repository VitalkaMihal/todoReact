import { TaskStatus } from "@/common/enums/enums.ts"

export type DomainTask = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description?: string
  title?: string
  status?: TaskStatus
  priority?: number
  startDate?: string
  deadline?: string
  order?: number
}
