import { Link } from "react-router"
import styles from "./PageNotFound.module.css"
import { Path } from "@/common/common/routing/Routing"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Link className={styles.link} to={Path.Main}>
      Вернуться на главную
    </Link>
  </>
)
