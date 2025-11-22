import styles from "./App.module.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "@/common/theme/theme.ts"
import { selectThemeMode } from "@/app/app-slice.ts"
import { ErrorSnackbar, Header, Routing } from "@/common/components"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { initializeAppTC } from "@/features/auth/model/auth-slice.ts"
import { useEffect } from "react"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

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
