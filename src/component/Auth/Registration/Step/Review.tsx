import {FieldValues, useFormContext} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import TextField from '../../UI/TextField'
import {clearFormData, ValueTextField} from '../Service/seveAndGetData'
import Button from '../../UI/Button'
import {useEffect, useState} from "react";
import {Status} from "../../../../store/type";
import {ErrorConfig} from "../../../toast/Error";
import {useSelector} from "react-redux";
import {selectRegister} from "../../../../store/user/selector";
import {useAppDispatcher} from "../../../../store";
import {register} from "../../../../store/user/asyncAction";

const Review = () => {
  const { handleSubmit } = useFormContext()
  const navigate = useNavigate();
  const user = useSelector(selectRegister);
  const dispatch = useAppDispatcher()
  const [error, setStatus] = useState(false)

  const onSubmitRegister = (data: FieldValues) => {
    const postRegister = async () => {
      const storageData = sessionStorage.getItem('registration-form-data');
      if (!storageData) {
        return;
      }
      const registerData = JSON.parse(storageData);
      dispatch(register({username: registerData.username, email: registerData.email, password: registerData.password, password2: registerData.password}))
    }
    postRegister().then(() => {
      /* clear Session Storage when visiting next page */
      clearFormData();
      navigate("/login", {replace : false});
    });
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
      }
        break;
    }
  }, [user.status, navigate])


    return (
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitRegister)}>
        <TextField inputFor={ValueTextField.EMAIL} label="your email" placeholder="" readOnly={true} />
        <TextField inputFor={ValueTextField.USERNAME} label="your login" placeholder="" readOnly={true} />

        <Button text="Войти" />
      </form>
    )
}

export default Review
