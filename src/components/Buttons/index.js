// import React, {Component} from 'react';
import React from 'react';
import {Form, Button} from 'react-bootstrap';

const Buttons =({variant, btnType, type, value, onClick})=> {
	return (
		<Form.Group>
			<Button 
				variant={variant} 
				className={btnType} 
				type={type}
				onClick={onClick}
				value={value}>
				{value}
			</Button>
		</Form.Group>
	)
}

export default Buttons;