import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import TextField from '../../UI/TextField'
import { ValueTextField } from '../Service/seveAndGetData'
import Button from '../../UI/Button'

const Review = () => {
    const { handleSubmit } = useFormContext()
    const navigate = useNavigate()

    const handler = () => {
        navigate("/", {replace : false})
    }

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handler)}>
            <TextField inputFor={ValueTextField.EMAIL} label="your email" placeholder="" readOnly={true} />
            <TextField inputFor={ValueTextField.LOGIN} label="your login" placeholder="" readOnly={true} />

            <Button text="вернуться на главную" />
        </form>
    )
}

export default Review