import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {useSelector} from 'react-redux';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { NavbarDiv } from './navBar/NavbarDiv';
import {PizzaMenu} from './pizzas/pizzaMenus.js';
import {LoginForm} from './login/Login';
import {RegisterForm} from './register/Register';
import {VegPizzas} from './pizzas/Veg/VegPizzas';
import {NonVegPizzas} from './pizzas/NonVeg/NonVegPizzas';
import {Desserts} from './pizzas/Desserts/Desserts';
import {Beverages} from './pizzas/Beverages/Beverages';
import {Sides} from './pizzas/Sides/Sides';
import {HomePageNavbar} from './navBar/HomePageNavbar';
import {AdminHomePageNavbar} from './admin/AdminHomePageNavbar';
import {AddNewVeg} from './admin/AddNewRecipe/AddNewVeg';
import {AddNewNonVeg} from './admin/AddNewRecipe/AddNewNonveg';
import {AddBeverage} from './admin/AddNewRecipe/AddBeverage';
import {AddDessert} from './admin/AddNewRecipe/AddDessert';
import {AddSide} from './admin/AddNewRecipe/AddSide';
import {EditForm} from './admin/editForm/EditForm';
import {OrderHistory} from "./navBar/orderHistory.js";
import {Cart} from "./navBar/cart";
import {ForgotPassword} from './login/ForgotPassword';
import {ResetPassword} from './login/ResetPassword';

function App(){
  const userLogged = useSelector((state) => state.user.logged);
  const isAdmin = useSelector((state) =>  state.user.admin);

  return(
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<><NavbarDiv /><PizzaMenu /><VegPizzas /></>}></Route>
      <Route path="/login" element={<><NavbarDiv /><LoginForm /></>}></Route>
      <Route path="/register" element={<><NavbarDiv /><RegisterForm /></>}></Route>
      <Route path="/veg" element={userLogged ? <>{!isAdmin ? <HomePageNavbar /> : <AdminHomePageNavbar />}<PizzaMenu /><VegPizzas /></> : <Navigate to="/" />}></Route>
      <Route path="/nonveg" element={userLogged ? <>{!isAdmin ? <HomePageNavbar /> : <AdminHomePageNavbar />}<PizzaMenu /><NonVegPizzas /></>: <><NavbarDiv /><PizzaMenu /><NonVegPizzas /></>}></Route>
      <Route path="/desserts" element={userLogged ? <>{!isAdmin ? <HomePageNavbar /> : <AdminHomePageNavbar />}<PizzaMenu /><Desserts /></>:<><NavbarDiv /><PizzaMenu /><Desserts /></>}></Route>
      <Route path="/beverages" element={userLogged ? <>{!isAdmin ? <HomePageNavbar /> : <AdminHomePageNavbar />}<PizzaMenu /><Beverages /></>: <><NavbarDiv /><PizzaMenu /><Beverages /></>}></Route>
      <Route path="/sides" element={userLogged ? <>{!isAdmin ? <HomePageNavbar /> : <AdminHomePageNavbar />}<PizzaMenu /><Sides /></>: <><NavbarDiv /><PizzaMenu /><Sides /></>}></Route>
      <Route path="/userHomePage" element={userLogged ? <><HomePageNavbar /><PizzaMenu /><VegPizzas /></> : <Navigate to="/" /> }></Route>
      <Route path="/adminHomePage" element={userLogged ? <><AdminHomePageNavbar /><PizzaMenu /><VegPizzas /></> : <Navigate to="/" />}></Route>
      <Route path="/addVeg" element={userLogged ? <><AdminHomePageNavbar /><AddNewVeg /></> : <Navigate to="/" />}></Route>
      <Route path="/addNonveg" element={userLogged ? <><AdminHomePageNavbar /><AddNewNonVeg /></> : <Navigate to="/" />}></Route>
      <Route path="/addBeverage" element={userLogged ? <><AdminHomePageNavbar /><AddBeverage /></> : <Navigate to="/" />}></Route>
      <Route path="/addDessert" element={userLogged ? <><AdminHomePageNavbar /><AddDessert /></> : <Navigate to="/" />}></Route>
      <Route path="/addSide" element={userLogged ? <><AdminHomePageNavbar /><AddSide /></> : <Navigate to="/" />}></Route>
      <Route path="/cart" element={userLogged ? <><HomePageNavbar /><PizzaMenu /><Cart /></> : <Navigate to="/" />}></Route>
      <Route path="/orderHistory" element={userLogged ? <><OrderHistory /></> : <Navigate to="/" />}></Route>
      <Route path="/editDetails/:pizzaId" element={userLogged ? <EditForm /> :<Navigate to="/" />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path="/resetPassword/:token/:loginUser" element={<ResetPassword />}></Route>
      <Route path="/logout" element={<Navigate to="/" />}></Route>
    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App;

