import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { LoginInputs } from "@/features/auth/lib/schemas"
import { setAppStatusAC } from "@/app/app-slice.ts"
import { authApi } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"
import { AUTH_TOKEN } from "@/common/constants"
import { clearDataAC } from "@/common/actions/actions.ts"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    loginNickname: null as string | null,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectLoginNickname: (state) => state.loginNickname,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await authApi.login(data)
          if (res.data.resultCode === ResultCode.Success) {
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { isLoggedIn: true }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await authApi.logout()
          if (res.data.resultCode === ResultCode.Success) {
            localStorage.removeItem(AUTH_TOKEN)
            dispatch(clearDataAC())
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { isLoggedIn: false, loginNickname: null }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    initializeAppTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await authApi.me()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { isLoggedIn: true, loginNickname: res.data.data.login }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error: any) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
          state.loginNickname = action.payload.loginNickname
        },
      },
    ),
  }),
})

export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions
export const { selectIsLoggedIn, selectLoginNickname } = authSlice.selectors
export const authReducer = authSlice.reducer
