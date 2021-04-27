import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {
        Table,
        Container,
        Row,
        Col,
        Dropdown
    } 
from 'react-bootstrap';

import FilterIcon from '../../assets/images/filter-icon.svg';
import editIcon from '../../assets/images/edit.svg';
import viewIcon from '../../assets/images/view.svg';
import deleteIcon from '../../assets/images/delete.svg';
import tableUser from '../../assets/images/tableUser.svg';

const CustomTable = (props) => {

    const [isToggleOn, setIsToggleOn]=useState(false);
    const [state,setstate]=useState({
        post:[]
    })
    const handleClick =() => {
        setIsToggleOn(!isToggleOn)
    }

    useEffect(()=>{
        const getposts=()=>{
            fetch(`../allpost.json`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
              })
            .then((response) =>
            {
                if (!response.ok)
                    throw new Error("HTTP error " + response.status);
            
                return response.json();
            })
            .then((data) => {debugger
            //    var Top=data.slice(Math.max(data.length - 10))
                setstate({...state,post:data})
            })
            .catch((error) => {
                console.error(error);
            });
        };
        getposts()
    },[])
  

    const history = useHistory();
    const routeChange = () => {
        let path = `post-details`;
        history.push(path);
    }

    return (
        <div className="teya-table">
            <div className={`table-filters ${isToggleOn ? 'active' :''}`}>
                <h4 className="filter-title" onClick={handleClick}>
                    <img src={FilterIcon} alt="filter-icon" className="filter-icon" />
                    Apply Filter
                </h4>
                <div className="filter-list">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Sort by
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">By Date</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">By bid amount</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Price range
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">By Date</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">By bid amount</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Filter sample
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">By Date</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">By bid amount</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <Table>
                
            </Table>
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Created at</th>
                        <th>Subject</th>
                        <th>Levels</th>
                        <th>Bid</th>
                        <th>User paid</th>
                        <th>Paid out</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {state.post.map((data,key)=>{
                        return(
                    <tr onClick={routeChange}>
                        <td className="table-img">
                            <span>
                                <img src={tableUser} alt="table-img" />
                            </span>
                        </td>
                        <td>{data.Title}</td>
                        <td>{data.Createdat}</td>
                        <td>{data.Subject}</td>
                        <td>{data.Levels}</td>
                        <td>{data.Bid}</td>
                        <td>{data.Userpaid}</td>
                        <td>{data.Paidout}</td>
                        <td>{data.Status}</td>
                        <td>
                            <div className="action-icons">
                                <img src={editIcon} alt="icon" />
                                <img src={viewIcon} alt="icon" />
                                <img src={deleteIcon} alt="icon" />
                            </div>
                        </td>
                    </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
                    
                    {/* <tr onClick={routeChange}>
                        <td className="table-img">
                            <span></span>
                        </td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>
                            <div className="action-icons">
                                <img src={editIcon} alt="icon" />
                                <img src={viewIcon} alt="icon" />
                                <img src={deleteIcon} alt="icon" />
                            </div>
                        </td>
                    </tr> */}


export default CustomTable;