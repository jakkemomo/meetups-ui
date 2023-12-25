import { FC } from "react"

type Props = {
    title : string
}

const TitleForm : FC<Props>= ({title}) => {
    return (
        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {title}
        </h1>
    )
}

export default TitleForm