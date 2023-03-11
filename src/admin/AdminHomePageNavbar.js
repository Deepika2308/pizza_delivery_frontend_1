import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import './AdminHomePageNavbar.css';
import {useDispatch,useSelector} from "react-redux";
import {logged} from '../features/user/userSlice';
import {HiBell} from 'react-icons/hi';
import {useState,useEffect} from 'react';
import io from 'socket.io-client';

export function AdminHomePageNavbar(){
  const dispatch = useDispatch();

    return(
        <div>
        <Navbar bg="light" expand="sm">
        <Navbar.Brand href="#" className="brand-name">
          <Link to="/adminHomePage" id="brand-name-link">Pizza</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navigation-links"></Navbar.Toggle>
        <Navbar.Collapse
          id="navigation-links"
          className="justify-content-between"
        >
            <ul className="admin-navbar-links d-flex justify-content-between">
                <li><Link to="/addVeg" className="admin-navbar text-danger">Add Veg</Link></li>
                <li><Link to="/addNonveg" className="admin-navbar text-danger">Add Non-veg</Link></li>
                <li><Link to="/addDessert" className="admin-navbar text-danger">Add Dessert</Link></li>
                <li><Link to="/addBeverage" className="admin-navbar text-danger">Add Beverage</Link></li>
                <li><Link to="/addSide" className="admin-navbar text-danger">Add Side</Link></li>
                <li><button className="btn btn-danger btn-sm" type="button" onClick={() => dispatch(logged(false))}>Logout</button></li>
            </ul>
        </Navbar.Collapse>
        </Navbar>
        </div>
    )
}