const auth=(state={
        isLoading: false,
        error: false,
        sessionExpired: false,
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
        case "logout":
        return {...state,
            sessionExpired: true,
            isLoading: false,
        }
        default : break;
    }
    return state
}
export default auth;