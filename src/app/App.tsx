import styles from "./App.module.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "@/common/theme/theme.ts"
import { selectThemeMode } from "@/app/app-slice.ts"
import { ErrorSnackbar, Header, Routing } from "@/common/components"
import { useAppSelector } from "@/common/hooks"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

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
