import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import { containerSx } from "@/common/styles/container.styles.ts"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "@/common/components/NavButton/NavButton.ts"
import Switch from "@mui/material/Switch"
import {
  changeThemeModeAC,
  selectIsLoggedIn,
  selectLoginName,
  selectStatus,
  selectThemeMode,
  setIsLoggedInAC,
  setLoginNameAC,
} from "@/app/app-slice.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { LinearProgress } from "@mui/material"
import { Link } from "react-router"
import { Path } from "@/common/common/routing/Routing.tsx"
import { ResultCode } from "@/common/enums/enums"
import { AUTH_TOKEN } from "@/common/constants"
import { clearDataAC } from "@/common/actions/actions.ts"
import { useLogoutMutation } from "@/features/auth/api/authApi"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const loginName = useAppSelector(selectLoginName)
  console.log(loginName)

  const [logout] = useLogoutMutation()

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: false }))
        dispatch(setLoginNameAC({ loginName: null }))
        localStorage.removeItem(AUTH_TOKEN)
        dispatch(clearDataAC())
      }
    })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            {loginName && <NavButton>{loginName}</NavButton>}
            {isLoggedIn && <NavButton onClick={logoutHandler}>Sign out</NavButton>}
            <NavButton component={Link} to={Path.Faq} background={theme.palette.primary.dark}>
              Faq
            </NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
