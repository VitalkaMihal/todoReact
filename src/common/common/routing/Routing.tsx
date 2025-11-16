import { Main } from "@/app/Main"
import { Login } from "@/features/features/auth/ui/Login"
import { Route, Routes } from "react-router"

export const Path = {
  Main: "/",
  Login: "login",
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Main />} />
    <Route path={Path.Login} element={<Login />} />
  </Routes>
)
