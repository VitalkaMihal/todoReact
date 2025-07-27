import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/components/TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";


export const Todolists = () => {
    const todoLists = useAppSelector(selectTodolists)

    return (<>
            {todoLists.map(todoList => {
                return (
                    <Grid key={todoList.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <TodolistItem todolist={todoList} />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};
