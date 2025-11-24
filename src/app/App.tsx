import styles from "./App.module.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "@/common/theme/theme.ts"
import { selectThemeMode, setIsLoggedInAC, setLoginNameAC } from "@/app/app-slice.ts"
import { ErrorSnackbar, Header, Routing } from "@/common/components"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import { useMeQuery } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  const { data, isLoading } = useMeQuery()

  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setLoginNameAC({ loginName: data.data.login }))
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    }
    setIsInitialized(true)
  }, [isLoading])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
