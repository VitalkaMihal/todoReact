import { Path } from "@/common/common/routing/Routing"
import { Navigate } from "react-router"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  isAllowed: boolean
}

export const ProtectedRoute = ({ children, isAllowed }: Props) => {
  if (!isAllowed) {
    return <Navigate to={Path.Login} />
  }
  return children
}
