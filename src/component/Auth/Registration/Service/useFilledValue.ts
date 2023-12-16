import { UseFormSetValue } from "react-hook-form"
import { useEffect } from "react"
import { ValueTextField, getFormData } from "./seveAndGetData"

type Prop = (setValue : UseFormSetValue<any>, fieldArray : ValueTextField[]) => void

const useFilledValue : Prop = (setValue, fieldArray) => {
  const dataInSessionStore = getFormData()
    
  useEffect(()=>{
    // if(Array.isArray(fieldArray)){
    //     fieldArray.forEach(key => {
    //       setValue(key, dataInSessionStore[key])
    //     })
    // } else {

    // }
    fieldArray.forEach(key => {
            setValue(key, dataInSessionStore[key])
          })
  },[])
}

export default useFilledValue