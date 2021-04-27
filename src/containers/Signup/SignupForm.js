// import React, {Component} from 'react';
import React,{ useState,useContext,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import {Container, Row,Col} from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
// import ToasterNotification from '../Notification/ToasterNotification';

import AppLogo from '../../assets/images/login-logo.svg';
import Title from '../../components/Titles';
import Input from '../../components/Input';
import Buttons from '../../components/Buttons';

import {validate} from '../../lib/Validate'
import { LanguageContext} from '../../Hooks/Context/Language';
import Signupuser from '../../Action/Signupuser'

const SignUp = () => {

    const history = useHistory();
    const dispatch=useDispatch();
    const IsAuth = useSelector((state)=>state.SignUp.loginSuccess);
    debugger
    const { register, handleSubmit,formState: { errors } } = useForm();
    const { dictionary } = useContext(LanguageContext);
    const [state,setState]=useState({
        username:'',
        password:''
    })

    useEffect(()=>{
        if(localStorage.getItem("AuthToken") || IsAuth)
        {
            history.push("/dashboard")
        }
    },[])

    const onSubmit = data => {
        localStorage.setItem("userInfo", data)
        dispatch(Signupuser(data))
    }

    return (
    <div className="login-page">
    {IsAuth ? history.push("/dashboard")
    :
    <Container fluid>
        <Row className="justify-content-start">
            <Col sm={4}>
            <div className="login-form">
                <div className="form-header">
                    <img src={AppLogo} className="img-fluid login-logo" alt="logo" />
                    <Title 
                        value={dictionary.label.signup} 
                        value1={dictionary.label.newuser+dictionary.label.register}>
                    </Title>
                </div>
                <Form onSubmit={handleSubmit((data)=>{onSubmit(data)})}>
                    <Input 
                        label={dictionary.label.loginId}
                        id="username"
                        register={register}
                        required
                        val={validate.email.emailPattern}
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
                                state.password.length <= validate.password.maximun ?
                                validate.password.lengthError : validate.requiredError
                                }
                        onChange={(e)=>{setState({password:e.target.value})}}
                    />
                    <Form.Group controlId="loginCheckbox" className="d-flex justify-content-between">
                        <Form.Check type="checkbox" label={dictionary.label.trustdevice} />
                        <Link>{dictionary.label.forgotYourPassword}</Link>
                    </Form.Group>
                    <Buttons
                        type="submit"
                        value={dictionary.label.register}
                    />
                    <h4 
                        className="bottom-link">
                        {dictionary.label.alredyaccount} 
                        <Link onClick={()=>{history.push("/")}}>
                            {dictionary.label.loginhere}
                        </Link>
                    </h4>
                </Form>
            </div>
            </Col> 
        </Row>
    </Container>
     } 
</div>
    )
}

export default SignUp;