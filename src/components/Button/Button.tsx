type ButtonProps = {
    title: string
    onClickHandler?: () => void
    className?: string
}

export const ButtonComponent = ({ title, onClickHandler, className }: ButtonProps) => {
    return <button className={className} onClick={onClickHandler}>{title}</button>
}