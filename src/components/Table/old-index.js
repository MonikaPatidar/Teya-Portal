import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
        Table,
        Container,
        Row,
        Col,
        Dropdown
    } 
from 'react-bootstrap';
import {useTable} from 'react-table';

import FilterIcon from '../../assets/images/filter-icon.svg';
import editIcon from '../../assets/images/edit.svg';
import viewIcon from '../../assets/images/view.svg';
import deleteIcon from '../../assets/images/delete.svg';

const CustomTable = (props) => {

    const [isToggleOn, setIsToggleOn]=useState(false);
    const handleClick =() => {
        setIsToggleOn(!isToggleOn)
    }

    const history = useHistory();
    const routeChange = () => {
        let path = `post-details`;
        history.push(path);
    }

    // React Table Arguments
    const data = React.useMemo(() =>
        [
            {
                name: 'Kim Parrish',
                address: '4420 Valley Street, Garnerville, NY 10923',
                date: '07/11/2020',
                order: '12345',
            },
            {
                name: 'Michele Castillo',
                address: '637 Kyle Street, Fullerton, NE 68638',
                date: '07/11/2020',
                order: '12345',
            },
        ]
    )
    const columns = React.useMemo(() => 
        [
        {
         Header: 'User Info',
         columns: [
        {
         Header: 'Name',
         accessor: 'name',
        },
        {
         Header: 'Address',
         accessor: 'address',
        },
        ],
        },
        {
         Header: 'Order Info',
         columns: [
        {
         Header: 'Date',
         accessor: 'date',
        },
        {
         Header: 'Order #',
         accessor: 'order',
        },
        ],
        },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })


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
            <Table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                       <tr {...headerGroup.getHeaderGroupProps()}>
                         {headerGroup.headers.map(column => (
                           <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                         ))}
                       </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {/*<Table hover>
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
                    <tr onClick={routeChange}>
                        <td><span>Image</span></td>
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
                    </tr>
                </tbody>
            </Table>*/}
        </div>
    )
}

export default CustomTable;