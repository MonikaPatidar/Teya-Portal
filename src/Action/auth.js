import { ToastContainer, toast } from 'react-toastify';
import TeyaApi from '../lib/Teya_api'
import {config} from '../Sys/Config'

    export function LoginUser(body){debugger
    return async (dispatch)=>{
        dispatch(showLoader())
        var teyaApi = new TeyaApi;
        teyaApi.url = `${config.API}users/login`;
        teyaApi.method = 'POST';
        teyaApi.body = (body)
        var res = await teyaApi.request();
        if(res.status==="success"){
            dispatch(loginSuccess(res.data.user.auth_token))
            localStorage.setItem("AuthToken",res.data.user.auth_token)
        }
        if(res.status==="fail"){debugger
            dispatch(fail(res.errors))
        }
    //     if(user)
    //     {
    //         dispatch(showLoader())
    //         localStorage.setItem('userInfo', JSON.stringify(user))
    //         return dispatch(loginSuccess(user))
    //     }
    //     else{
    //         return dispatch(fail("wrong"))
    //         }
    }
}


export function logOut(){
    localStorage.clear();
    window.location = '/';
    window.location.reload();
}

export function loginSuccess(res){debugger
  return{
      type: 'login_success',
      payload: res
  }
}

export function showLoader(){debugger
  return{
      type: 'is_loading'
  }
}

export function fail(res){debugger
    return{
        type: 'fail',
        payload: res
    }
}

export function serverError(error){
    return{
        type: 'server_error',
        payload: error
    }
}