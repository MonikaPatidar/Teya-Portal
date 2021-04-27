// import React, {Component} from 'react';
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainContainer = (props) => {
    return (
        <div>
            <Sidebar />
            <Header />
            <div className="main-body">
            	{props.children}
	        </div>
        </div>
    )
}

export default MainContainer;