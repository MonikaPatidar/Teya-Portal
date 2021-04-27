import React from 'react';
import {InputGroup, FormControl, Dropdown} from 'react-bootstrap';

// Images & Icons
import headerSetting from '../../assets/images/header-icons/header-setting.svg';
import searchIcon from '../../assets/images/header-icons/search.svg';

const Header = () => {
    return (
        <header>
    		<div className="items-left">
    			<h4 className="page-title">Page Title</h4>
    		</div>
    		<div className="items-right">
    			<InputGroup className="search-bar">
				    <FormControl
				      	placeholder="Search ..."
				      	aria-label="Search"
				    />
				    <InputGroup.Prepend>
				      	<InputGroup.Text id="basic-addon1"><img src={searchIcon} alt="search-icon"/></InputGroup.Text>
				    </InputGroup.Prepend>
				</InputGroup>
				<div className="header-icons">
					<Dropdown>
					  	<Dropdown.Toggle variant="success" id="dropdown-basic">
					    	<img src={headerSetting} alt="icon" />
					  	</Dropdown.Toggle>
					  	<Dropdown.Menu>
					    	<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
					    	<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
					  	</Dropdown.Menu>
					</Dropdown>
				</div>
    		</div>
        </header>
    )
}

export default Header;