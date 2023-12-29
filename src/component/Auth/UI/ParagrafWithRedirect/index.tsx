import {FC} from 'react'
import {Link} from 'react-router-dom'

type Props = {
    link: string,
    text: string,
    linkText: string
}

const ParagrafWithRedirect: FC<Props> = ({ link, text, linkText }) => {
    return (
        <div className="ml-3 text-sm">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {text} &nbsp;
                <Link to={link} className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600">
                    {linkText}
                </Link>
            </p>
        </div>
    )
}

export default ParagrafWithRedirect
