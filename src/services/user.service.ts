import { Injectable } from "@dogonis/react-injectable";

export interface UserServiceState {
    psid: string | null;
}

export class UserService extends Injectable<UserServiceState> {
    static KEY = "user_psid"

    getDefaultState(): UserServiceState {
        return {
            psid: localStorage.getItem(UserService.KEY)
        }
    }

    login(psid: string){
        localStorage.setItem(UserService.KEY, psid)
        this.setState({ psid })
    }

    logout(){
        localStorage.removeItem(UserService.KEY)
        this.setState({ psid: null })
    }
}