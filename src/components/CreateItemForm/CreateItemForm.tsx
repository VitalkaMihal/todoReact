import {Button} from "../Button/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type CreateItemFormProps = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: CreateItemFormProps) => {

    const [Title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        setError(null)
    }

    const createItemHandler = () => {
        const trimmedTitle = Title.trim()
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
            <input value={Title}
                   onChange={onChangeHandler}
                   onKeyDown={createItemOnEnterHandler}
                   className={error ? 'error' : ''}
            />
            <Button title={'+'} onClickHandler={createItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};
