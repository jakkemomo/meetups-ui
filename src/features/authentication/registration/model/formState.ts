import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface IRegisterFormState {
    selectedTab: number,
    bgCardType: Array<'WELCOME' | 'VISIT_EVENTS' | 'FIND_FRIENDS'>,
    data: {
        username: string,
        email: string,
        password: string
    }

}

const initialState: IRegisterFormState = {
    selectedTab: 0,
    bgCardType: ['WELCOME'],
    data: { username: '', email: '', password: ''}
}


export const registerFormSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    userDataFilled(state, action: PayloadAction<{ username: string; email: string }>) {
      state.data = {
        ...state.data,
        ...action.payload
      };
      state.selectedTab += 1;
      state.bgCardType.push('VISIT_EVENTS');
    },
    passwordFilled(state, action: PayloadAction<{ password: string }>) {
      state.data = {
        ...state.data,
        ...action.payload
      };
      state.selectedTab += 1;
      state.bgCardType.push('FIND_FRIENDS');
    },
    goBack(state) {
      if (state.selectedTab != 0 && state.bgCardType.length > 1) {
        state.selectedTab -= 1;
        state.bgCardType.pop();
      }
    },
    registerComplete(state) {
      state.selectedTab = 0;
      state.bgCardType = ['WELCOME'];
      state.data = { username: '', email: '', password: ''};
    }
  },
})

export const { userDataFilled, passwordFilled, goBack, registerComplete } = registerFormSlice.actions;

export const selectBGCard = (state: RootState) => state.register.bgCardType[state.register.bgCardType.length - 1];
export const selectTabId = (state: RootState) => state.register.selectedTab;
export const selectUserData = (state: RootState) => state.register.data;
