import {CSSProperties} from 'react'

export const containerSx: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
}

export const getListItemSx = (isDone: boolean): CSSProperties => ({
    padding: 0,
    justifyContent: 'space-between',
    opacity: isDone ? 0.5 : 1,
})