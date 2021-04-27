// import React, {Component} from 'react';
import React, { useContext,useState,useEffect } from 'react';
import {Link, useHistory,Redirect} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import {Container, Row,Col} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast} from "react-toastify";

import AppLogo from '../../assets/images/login-logo.svg';
import Title from '../../components/Titles';
import Input from '../../components/Input';
import Buttons from '../../components/Buttons';

import {validate} from '../../lib/Validate'
import {LoginUser} from '../../Action/auth'
import LanguageSelector from '../../Hooks/Lang/InlineLanguageSelection';
import { LanguageProvider } from '../../Hooks/Context/Language';
import { LanguageContext} from '../../Hooks/Context/Language';


const LoginPage = () => {

    const history = useHistory();
    var dispatch = useDispatch();
    const IsError = useSelector(state => state.authUser.errorMessages);
    const IsAuth = useSelector(state=>state.authUser.user.auth_token)
    const { dictionary } = useContext(LanguageContext);
    const { register, handleSubmit,formState: { errors } } = useForm();
    const [state,setState]=useState({
        username:'rafk_',
        password:'moon.net.org12'
    })

    useEffect(()=>{
        if(localStorage.getItem("AuthToken") || IsAuth)
        {
            history.push("/dashboard")
        }
    },[])
    
    const onSubmit = data => {debugger
        dispatch(LoginUser(data))
    }

    return (
    <div className="login-page">
      {IsError && 
          toast.error(
              <div>
            {IsError.map((error) => {debugger
                return(
                    <p>{error}</p>
                )
            }
        )}</div>)
      ?
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false} 
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
    />
      :
      ''}
      {/* {IsAuth ? 
        : */}
        <Container fluid>
            <Row className="justify-content-start">
                <Col sm={4}>
                <div className="login-form">
                    <div className="form-header">
                        <img src={AppLogo} className="img-fluid login-logo" alt="logo" />
                        <Title 
                            value={dictionary.label.Loginintoaccount} 
                            value1={dictionary.label.Useyourcredentialstoaccessyouraccount}>
                        </Title>
                    </div>
                <Form onSubmit={handleSubmit((data)=>{onSubmit(data)})}>
                    <Input 
                        label={dictionary.label.loginId}
                        id="username"
                        register={register}
                        required
                        // val={validate.email.emailPattern}
                        placeholder={dictionary.placeholder.typehere}
                        type="text"
                        value={state.username}
                        errors={errors.username}
                        message={validate.requiredError}
                        onChange={(e)=>{setState({username:e.target.value})}}
                    />
                    <Input 
                        label={dictionary.label.password}
                        id="password"
                        register={register} 
                        required
                        errors={errors}
                        placeholder={dictionary.placeholder.enterpassword}
                        minLength={validate.password.minimum}
                        maxLength= {validate.password.maximun}
                        type="password"
                        value={state.password}
                        errors={errors.password}
                        message={state.password.length >= validate.password.minimum &&
                                state.password<= validate.password.maximun ? 
                                validate.password.lengthError : validate.requiredError
                                }
                        onChange={(e)=>{setState({password:e.target.value})}}
                    />
                    <Form.Group controlId="loginCheckbox" className="d-flex justify-content-between">
                        <Form.Check type="checkbox" label={dictionary.label.trustdevice} />
                        <Link>{dictionary.label.forgotYourPassword}</Link>
                    </Form.Group>
                    <LanguageProvider>
                        <LanguageSelector />
                    </LanguageProvider>
                    <Buttons
                        type="submit"
                        value={dictionary.buttonText.login}
                    />
                    <h4 
                    className="bottom-link">{dictionary.label.noaccount} 
                        <Link onClick={()=>{history.push("/signup")}}>
                        {dictionary.label.registerhere}
                        </Link>
                    </h4>
                </Form>
            </div>
            </Col>
        </Row>
    </Container>
    {/* } */}
    </div>
    )
    }

export default LoginPage;


// ref={register({
//     required: {
//     value: true,
//     message: "email   is required",
//     },
     
//     pattern: {
//         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//         message: "invalid email address"
//     }
// })}
// <p>{errors.email?.message}</p>
