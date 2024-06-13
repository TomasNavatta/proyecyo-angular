import { createReducer, on } from "@ngrx/store";
import { IUser } from "../../layouts/dashboard/pages/users/models";
import { authActions } from "./auth.actions";

export interface AuthState {
    authUser: null | IUser
}

const initialState: AuthState = {
    authUser: null,
}

const  MOCK_AUTH_USER: IUser = {
    id: 1,
  createdAt: new Date(),
  email: "tomasnavatta@gmail.com",
  firstName: "tomas",
  role: 'ADMIN',
  lastName: "navatta"
}

export const authFeatureName = 'auth'

export const AuthReducer = createReducer(initialState,
    on(authActions.login, (state, action) => { 
      
        if(action.payload.email !== 'tomas@gmail.com' || action.payload.password !== '1234') {
            alert('correo o password incorrectos')
            return state
          } else{
        //    this.__authUser$.next(this.MOCK_AUTH_USER)
          localStorage.setItem('accessToken',
           'hdwedhweudhbwedvbweud')
           //  this.router.navigate(['dashboard', 'home'])
           return {
            authUser: MOCK_AUTH_USER
           }
          }


    }),
    on(authActions.logout, () => {

        localStorage.removeItem('accessToken')

        return initialState

    })
)