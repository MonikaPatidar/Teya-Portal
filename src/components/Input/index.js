// import React, {Component} from 'react';
import React from 'react';
import {Form} from 'react-bootstrap';

const Input =({label,placeholder,type,register, required, val ,minLength,maxLength,id,errors,message})=> {
	return (
		<Form.Group> 
			<Form.Label>{label}</Form.Label>
			{!errors ?
				<Form.Control {...register(id,{ required,pattern:{value:val},minLength,maxLength})} placeholder={placeholder} type={type?type:"text"}>
				</Form.Control>
			:
			<>
				<Form.Control {...register(id,{ required,pattern:{value:val},minLength,maxLength})} placeholder={placeholder} type={type?type:"text"} isInvalid={errors}>
				</Form.Control>
				<Form.Control.Feedback type='invalid'>
				{ message }
				</Form.Control.Feedback>
			</>
			}
		</Form.Group>
	)
}

export default Input; 