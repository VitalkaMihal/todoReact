import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice"
import type { BaseResponse } from "@/common/types"
import type { Dispatch } from "@reduxjs/toolkit"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  const error = data.messages.length ? data.messages[0] : "Some error occurred"
  dispatch(setAppErrorAC({ error: error }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
