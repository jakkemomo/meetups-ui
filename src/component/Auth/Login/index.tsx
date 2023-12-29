import {FieldValues, FormProvider, useForm} from 'react-hook-form'
import {ValueTextField} from '../Registration/Service/seveAndGetData'
import Button from '../UI/Button'
import FormContainer from '../UI/FormContainer'
import TextField from '../UI/TextField'
import TitleForm from '../UI/TitleForm.tsx'
import {useSelector} from 'react-redux'
import {selectUser} from '../../../store/user/selector'
import {useAppDispatcher} from '../../../store'
import {login} from '../../../store/user/asyncAction'
import {useEffect, useState} from 'react'
import {Status} from '../../../store/type'
import {useNavigate} from 'react-router-dom'
import {Error, ErrorConfig} from '../../toast/Error'
import ParagrafWithRedirect from '../UI/ParagrafWithRedirect'

const Login = () => {
  const methods = useForm()
  const user = useSelector(selectUser)
  const dispatch = useAppDispatcher()
  const [error, setStatus] = useState(false)
  const navigate = useNavigate();


  const handleSubmit = (data: FieldValues) => {
    const get = async () => {
      dispatch(login({username: data.username, password: data.password}))
    }
    get()
    console.log(data)
  }

  useEffect(() => {
    switch (user.status) {
      // eslint-disable-next-line no-lone-blocks
      case Status.ERROR: {
        ErrorConfig("произошла ошибка, попробуйте позже")
        setStatus(true)
      }
        break;
      // eslint-disable-next-line no-lone-blocks
      case Status.SUCCESS: {
        navigate("/")
        // if (user.isActivated) {
        //   setStatus(false)
        //   navigate("/dashboard")
        // } else {
        //   ErrorConfig("неверный логин или пароль")
        //   setStatus(true)
        // }
      }
        break;
    }
  }, [user.status, navigate])

  return (
    <FormContainer>
      <>
        {error && <Error/>}
        {user.status === Status.LOADING ?
          "Типо крутой спиннер" :
          <FormProvider {...methods}>
            <form className="space-y-4 md:space-y-6" onSubmit={methods.handleSubmit(handleSubmit)}>
              <TitleForm title="Login"/>
              <TextField inputFor={ValueTextField.USERNAME} label="Your login" placeholder="login"/>
              <TextField inputFor={ValueTextField.PASSWORD1} label="Password" placeholder="password"/>
              <ParagrafWithRedirect link="/registration" text="Don't have an account?" linkText="Register"/>
              <Button text="Login"/>
            </form>
          </FormProvider>
        }
      </>
    </FormContainer>
  )
}

export default Login
