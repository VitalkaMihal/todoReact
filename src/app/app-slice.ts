import { createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "@/common/types"

export type ThemeMode = "dark" | "light"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
    loginName: null as string | null,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith("/pending")
        },
        (state) => {
          state.status = "loading"
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.status = "failed"
        },
      )
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setLoginNameAC: create.reducer<{ loginName: string | null }>((state, action) => {
      state.loginName = action.payload.loginName
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectLoginName: (state) => state.loginName,
  },
})

export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC, setIsLoggedInAC, setLoginNameAC } = appSlice.actions

export const appReducer = appSlice.reducer

export const { selectThemeMode, selectStatus, selectAppError, selectIsLoggedIn, selectLoginName } = appSlice.selectors
