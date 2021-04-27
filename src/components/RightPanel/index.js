// import React, {Component} from 'react';
import React from 'react';
import {
	Container, 
	Row,
	Col
} from 'react-bootstrap';

const RightPanel = () => {
    return (
        <div className="right-panel">
            <Container fluid>
            	<Row className="justify-content-start">
            		<Col sm={4}>
            			Rightpanel goes here
            		</Col>
            	</Row>
            </Container>
        </div>
    )
}

export default RightPanel;