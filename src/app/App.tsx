import styles from "./App.module.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useAppSelector } from "../common/hooks/useAppSelector.ts"
import { Header } from "@/common/components/Header/Header.tsx"
import { getTheme } from "@/common/theme/theme.ts"
import { Main } from "@/app/Main.tsx"
import { selectThemeMode } from "@/app/app-slice.ts"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
