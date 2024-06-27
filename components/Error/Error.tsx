export const Error = ({
    message,
    type,
    className
}: {
    type: string,
    message: string;
    className: string;
}) => {
    return (
        <div className={`${type === "error" ? 'bg-rose-300 text-red-600' : 'bg-emerald-500/15 text-emerald-600'} p-2 rounded-md flex items-baseline gap-x-2 text-lg  ${className}`}>
            {type === "error" ? <i className="fa-solid fa-triangle-exclamation mx-2"></i>
                : <i className="fa-solid fa-circle-check mx-2"></i>}
            <p>{message}</p>
        </div>
    )
}