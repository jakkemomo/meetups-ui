import { Middleware } from '@reduxjs/toolkit';

const middleware: Middleware = api => next => async action => {

  console.log(action)
    const response = next(action)
  
    // // Do something after the action hits the reducer
    // const afterState = api.getState()

    /*
    * action:
    *    payload: 
    *        isActivated : boolean
    *        login       : string
    *        role        : enum
    */
    // if (action.type === "user/loginStatus/fulfilled") {
    //   localStorage.setItem("user", JSON.stringify(action.payload))
    // }
    return response
  }

export default middleware;
