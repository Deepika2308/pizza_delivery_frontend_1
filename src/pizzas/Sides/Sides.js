import '../Pizza.css';
import {useEffect,useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {API} from "../../global.js";

export function Sides(){
    let[sides,setSides] = useState([]);
    let[showSpinner,setShowSpinner] = useState(true);

    let userLogged =useSelector((state) => state.user.logged);
    const navigate = useNavigate();

    useEffect(() => {
       let fetchSides = async () =>{
        let sides = await fetch(`${API}/items/getSides`);
        return sides;
       }
       fetchSides()
       .then((res) => res.json())
       .then((list) => {
        setShowSpinner(false);
        setSides(list.result);
    });
    },[])

    return(
        <div className="container mt-3">
            <h2 className="pt-2">Sides</h2>
            {showSpinner ? <div className="spinner-border text-danger mt-4" role="status"></div> : ""}

            <div className="d-sm-flex flex-wrap justify-content-evenly gap-5 m-5 mt-2">
                {sides.map((side,index) => {
                    return <div className="card mt-4" key={index}>
                    <img className="pizza-img" src={side.img} alt="veg pizza"></img>
                    <div className="card-body">
                        <div className="card-title text-start text-wrap">{side.name}</div>
                        <p className="card-text text-wrap text-start">{side.desc}</p>
                        <div className="d-flex justify-content-between vertical-align-middle">
                            <div className="price fs-4">{side.price}</div>
                            <button className="btn btn-danger" type="button" onClick= {() => {
                                if(!userLogged){
                                    navigate("/login");
                                }
                            }}>Add to cart 🌮
                            </button>
                        </div>
                    </div>
                </div>
                })}
            </div>
        </div>
    )
}