type ButtonProps = {
    title: string
    onClickHandler?: () => void
}

export const Button = ({ title, onClickHandler }: ButtonProps) => {
    return <button onClick={onClickHandler}>{title}</button>
}