import Navbar from "react-bootstrap/Navbar";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { BranchModalDiv } from '../components/BranchModalDiv';
import {useSelector,useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BiUser} from "react-icons/bi";
import { RiShoppingCartFill } from 'react-icons/ri';
import {HiBell} from 'react-icons/hi';
import {decreaseNotificationCount} from '../features/notifications/notificationSlice';
import './HomePageNavbar.css';
import {logged} from '../features/user/userSlice';
import "../App.css";

export function HomePageNavbar(){
    let [modal, showModal] = useState(false);
    let [branch, setBranch] = useState("");
    let [toast,setToast] = useState(false);
    let branchName = useSelector((state) => state.branch);
    let cartSize = useSelector((state) => state.cart.cartSize);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.users);
    const notification = useSelector((state) =>  state.notification.notification);
    const notificationCount = useSelector((state) => state.notification.notificationCount);
  
    return(
        <div>
        <Navbar bg="light" expand="sm">
        <Navbar.Brand href="#" className="brand-name">
          Pizza
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navigation-links"></Navbar.Toggle>
        <Navbar.Collapse
          id="navigation-links"
          className="justify-content-between"
        >
          <div className="d-flex gap-5 branch-and-delivery">
            <div
            className="Branch text-dark d-flex gap-4"
            onClick={() => showModal(!modal)}
          >
            {branch ? (
              <div>
                <span>
                  <i className="branch-icon">
                    <MdLocationOn size={20} />
                  </i>
                </span>
                <span>{branchName.branchName}</span>
              </div>
            ) : (
              ""
            )}
            <div>
              <span className="branch-text"> Branch </span>
              <span>
                <i className="search-icon">
                  <BsSearch />
                </i>
              </span>
            </div>
          </div>
          </div>

          <div className="d-flex gap-5 cart-and-userName">

            {/* notification icon */}
            <div className="notification-div d-flex flex-column" onClick={() => {
              setToast(!toast);
              if(notificationCount){
                dispatch(decreaseNotificationCount());
              }
            }
              }>
              <i className="notification-icon position-relative"><HiBell size={23} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{notificationCount}</span>
            </i>

            {toast ?
            <div className="noti position-absolute">
              <div className="noti1 tbody">
    {notification}
  </div>
            </div>
             :""}
            </div>

            {/* cart icon */}
          <div><i className="cart-icon position-relative"><RiShoppingCartFill size={22} onClick={() => navigate("/cart")} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartSize}</span>
          </i>
          </div>

          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <div><i><BiUser /></i><span> {user.result.first_name}</span></div>
            </button>
            <ul className="dropdown-menu">
              <li><Link to="/orderHistory" className="user-link">Order History</Link></li>
              <li><Link to="/editProfile" className="user-link">Edit Profile</Link></li>
              <li><button className="logout-button pl-2" onClick={() => {
                dispatch(logged(false));
                navigate("/");
              }}>Logout</button></li>
            </ul>
          </div>
          </div>
          </Navbar.Collapse>
        </Navbar>

        {modal ? (
        <BranchModalDiv
          show={modal}
          setShow={showModal}
          branch={branch}
          setBranch={setBranch}
        />
      ) : (
        ""
      )}

        </div>
    )
}