// import React, {Component} from 'react';
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {
    Navbar,
    Nav
} from 'react-bootstrap';
import './sidebar.scss';

// Images and Icons
import sideLogo from '../../assets/images/sidebar-logo.svg';
import dashboardInActive from '../../assets/images/sidebar-icons/dashboard-inactive.svg';
import dashboardActive from '../../assets/images/sidebar-icons/dashboard-active.svg';
import postsInActive from '../../assets/images/sidebar-icons/post-inactive.svg';
import postsActive from '../../assets/images/sidebar-icons/post-active.svg';
import workshopInActive from '../../assets/images/sidebar-icons/workshop-inactive.svg';
import workshopActive from '../../assets/images/sidebar-icons/workshop-active.svg';
import profileInActive from '../../assets/images/sidebar-icons/profile-inactive.svg';
import profileActive from '../../assets/images/sidebar-icons/profile-active.svg';
import settingInActive from '../../assets/images/sidebar-icons/setting-inactive.svg';
import settingActive from '../../assets/images/sidebar-icons/setting-active.svg';

const Sidebar = () => {
    // const [isToggleOn, setIsToggleOn]=useState(false);

    // const handleClick =() => {
    //     setIsToggleOn(!isToggleOn)
    // }

    return (
        <div className="sidebar">
        	<Navbar bg="" variant="">
                <Navbar.Brand href="#home">
                    <img src={sideLogo} alt="sidebar-logo" />
                </Navbar.Brand>
                <Nav className="">
                    <NavLink 
                        to="/dashboard" 
                        className="nav-link"
                    >
                        <img src={dashboardInActive} alt="sidebar-icon" className="icon-inactive" />
                        <img src={dashboardActive} alt="sidebar-icon" className="icon-active" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink 
                        to="/posts"
                        className="nav-link"
                    >   
                        <img src={postsInActive} alt="sidebar-icon" className="icon-inactive" />
                        <img src={postsActive} alt="sidebar-icon" className="icon-active" />
                        <span>Posts</span>
                    </NavLink>
                    <NavLink 
                        to="/workshops"
                        className="nav-link"
                    >
                        <img src={workshopInActive} alt="sidebar-icon" className="icon-inactive" />
                        <img src={workshopActive} alt="sidebar-icon" className="icon-active" />
                        <span>Workshops</span>
                    </NavLink>
                    <NavLink 
                        to="/profile"
                        className="nav-link"
                    >
                        <img src={profileInActive} alt="sidebar-icon" className="icon-inactive" />
                        <img src={profileActive} alt="sidebar-icon" className="icon-active" />
                        <span>Profile</span>
                    </NavLink>
                    <NavLink 
                        to="/settings"
                        className="nav-link"
                    >
                        <img src={settingInActive} alt="sidebar-icon" className="icon-inactive" />
                        <img src={settingActive} alt="sidebar-icon" className="icon-active" />
                        <span>Settings</span>
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Sidebar;