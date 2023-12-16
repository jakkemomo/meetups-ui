import { FC } from "react"

type Prop = {
    text : string
}

const Button : FC<Prop> = ({text}) => {
    return (
        <button
            type="submit"
            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
        >
            {text}
        </button>
    )
}

export default Button