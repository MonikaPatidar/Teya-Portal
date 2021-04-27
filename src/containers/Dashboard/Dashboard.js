// import React, {Component} from 'react';
import React, { useContext } from 'react';
import {Container, Row,Col} from 'react-bootstrap';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
// import Dashboard from './Dashboardaa';
import RightPanel from '../../components/RightPanel';

const Dashboard = (props) => {debugger
    return (
        <div className="dashboard-page"> 
        {/* Dashboard page design here       	 */}
        <div className="main-body">
            <Container fluid>
            	<Row className="justify-content-start">
            		<Col sm={4}>
            			Dashboard Body
            		</Col>
            	</Row>
            </Container>
        </div>
        </div>    
    )
}

export default Dashboard;