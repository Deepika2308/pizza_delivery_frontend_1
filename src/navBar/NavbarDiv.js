import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {SiHomeassistantcommunitystore} from 'react-icons/si';

export function NavbarDiv() {
  return (
    <div>
      <Navbar bg="light" expand="sm">
        <Navbar.Brand href="#" className="brand-name">
          Pizza
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navigation-links"></Navbar.Toggle>
        <Navbar.Collapse
          id="navigation-links"
          className="justify-content-start"
        >
          <Nav className="nav-links d-flex justify-content-between">
            <NavLink to="/" className="navLinks-home text-dark me-4 ">
              <SiHomeassistantcommunitystore size={20} />
            </NavLink>

            <NavLink to="/login" className="navLinks-login text-dark text-right me-4 ">
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

