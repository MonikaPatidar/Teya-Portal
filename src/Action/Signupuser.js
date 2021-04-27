import { ToastBody } from 'react-bootstrap'
import TeyaApi from '../lib/Teya_api'
import {config} from '../Sys/Config'

    export const Signupuser = (body)=>{
    return async (dispatch)=>{
        dispatch(showLoader())
        var teyaApi = new TeyaApi;
        teyaApi.url = `${config.API}/users`;
        teyaApi.method = 'POST';
        teyaApi.body = (ToastBody)
        var res = await teyaApi.request(); 
        if(res.code===200)
        {
            return dispatch(signupSuccess(body))
        }
        else{
            return dispatch(fail("Wrong Request"))
        }
    }
}
    
const showLoader=()=>{
    return{
        type: 'is_loading'
    }
}

const signupSuccess=(res)=>{
    return{
        type: 'login_success',
        payload: res
    }
}


const fail=(res)=>{
    return{
        type: 'fail',
        payload: res
    }
}

const serverError=(error)=>{
    return{
        type: 'server_error',
        payload: error
    }
}
export default Signupuser;

// export {Signup,showLoader,signupSuccess,fail,serverError}