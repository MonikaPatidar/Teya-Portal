// import React, {Component} from 'react';
import React from 'react';

const Titles =({loginTitle, value, value1})=> {
	return (
		<div className="login-titles">
			<h4 value={value}>{value}</h4>
			<p>{value1}</p>
		</div>
	)
}

export default Titles; 