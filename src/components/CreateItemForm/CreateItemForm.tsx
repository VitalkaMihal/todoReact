import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

type CreateItemFormProps = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: CreateItemFormProps) => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        setError(null)
    }

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       className={error ? 'error' : ''}
                       value={title}
                       size={'small'}
                       error={!!error}
                       helperText={error}
                       onChange={onChangeHandler}
                       onKeyDown={createItemOnEnterHandler}/>
            {/*<input value={Title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyDown={createItemOnEnterHandler}*/}
            {/*       className={error ? 'error' : ''}*/}
            {/*/>*/}
            <Button variant="contained" onClick={createItemHandler}>+</Button>
            {/*<ButtonComponent title={'+'} onClickHandler={createItemHandler}/>*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    );
};
