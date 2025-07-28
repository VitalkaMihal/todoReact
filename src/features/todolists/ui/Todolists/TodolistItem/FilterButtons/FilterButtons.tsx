import {Box, Button} from "@mui/material";
import {containerSx} from "@/features/todolists/ui/Todolists/TodolistItem/Todolistitems.styles.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {FilterValues, TodoList} from "@/app/App.tsx";
import {changeTodolistFilterAC} from "@/features/todolists/model/todolists-reducer.ts";

type Props = {
    todolist: TodoList
}

export const FilterButtons = ({todolist}: Props) => {
    const {id, filter} = todolist

    const dispatch = useAppDispatch()

    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <Box sx={containerSx}>
            <Button variant={filter === 'all' ? 'outlined' : 'contained'}
                    size="small"
                    color={filter === 'all' ? 'inherit' : 'primary'}
                    onClick={() => changeFilterHandler('all')}>
                All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'contained'}
                    size="small"
                    color={filter === 'active' ? 'inherit' : 'primary'}
                    onClick={() => changeFilterHandler('active')}>
                Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'contained'}
                    size="small"
                    color={filter === 'completed' ? 'inherit' : 'secondary'}
                    onClick={() => changeFilterHandler('completed')}>
                Completed
            </Button>
        </Box>
    );
};

