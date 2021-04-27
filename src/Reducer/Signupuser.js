const signup=(state={
    isLoading: false,
    error: false,
    serverError: false,
    user:[]
    }, action)=>{
        switch(action.type){
            case "is_loading":
                return {...state,
                    isLoading: true,
                    error: false,
                    serverError: false
                }
            case "login_success":
                return {...state,
                    isLoading: false,
                    loginSuccess: true,
                    user:action.payload
                }
            case "fail":
                return {...state,
                    isLoading: false,
                    error: true,
                    errorMessages: action.payload
                }
            case "server_error":
                return {...state,
                    isLoading: false,
                    serverError: true
                }
            default : break;
        }
        return state
    }
export default signup;