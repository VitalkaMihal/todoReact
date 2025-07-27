import type { RootState } from '../app/store'
import {ThemeMode} from "../app/app-reducer.ts";

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode