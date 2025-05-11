type ButtonProps = {
    title: string
    onClickHandler?: () => void
    className?: string
}

export const Button = ({ title, onClickHandler, className }: ButtonProps) => {
    return <button className={className} onClick={onClickHandler}>{title}</button>
}