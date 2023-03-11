import {Link} from "react-router-dom";

export function PizzaMenu(){
    return(
        <div className="pizza-menu-div">
                <ul className="unordered-menu-list d-flex flex-wrap justify-content-evenly">
                    <li><Link to="/veg" className="menu-link">Veg Pizza</Link></li>
                    <li><Link to="/nonveg" className="menu-link">Non-veg Pizza</Link></li>
                    <li><Link to="/desserts" className="menu-link">Dessert</Link></li>
                    <li><Link to="/beverages" className="menu-link">Beverages</Link></li>
                    <li><Link to="/sides" className="menu-link">Sides</Link></li>
                </ul>
        </div>
    )
}