import "../Pizza.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from '../../features/cart/cartSlice';
import axios from 'axios';
import {API} from "../../global.js";

export function VegPizzas() {

  let userLogged = useSelector((state) => state.user.logged);
  let isAdmin = useSelector((state) => state.user.admin);

  let selectedPizzaObj ={}

  let [selectedPizzaSize,setSelectedPizzaSize] = useState("");
  let [selectedCrust,setSelectedCrust] = useState("Hand Tossed");
  let [showSpinner,setShowSpinner] = useState(true);

  let [qty,setQty] = useState(0);
  let [qtyErrorMessage, setQtyErrorMessage] = useState(false);
  let [sizeErrorMessage, setSizeErrorMessage] = useState(false);
  let [showMessage,setShowMessage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //lists of all pizzas - information
  let [vegPizzas, setVegPizzas] = useState([]);
  let [crusts,setCrusts] = useState([]);


const fetchVegPizzas = () =>{
  fetch(`${API}/items/getVegPizzas`)
  .then((res) => res.json())
  .then((res) =>{
    setShowSpinner(false);
    setVegPizzas(res.result);
  } )
}

  useEffect(() =>{
    let fetchCrusts = async() => {
      let crusts = await axios.get(`${API}/items/getCrusts`);
      setCrusts(crusts.data.result);
    }
    fetchCrusts();
  }, []);

  useEffect(fetchVegPizzas, []);

  const deleteItem = async(id) => {
    try{
      await axios.delete(`${API}/delete/deleteVegPizza/${id}`);
      fetchVegPizzas()
    }
    catch(err){
      alert("Error in deleting an item. Please try again after sometime");
    }
  }


  function showAlert(eventName){
    if(eventName === "AddedToCart"){
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      },2000)
    }
    if(eventName === "Quantity"){
      setQtyErrorMessage(true);
      setTimeout(() => {
        setQtyErrorMessage(false);
      },1500)
    }
    if(eventName === "PizzaSize"){
      setSizeErrorMessage(true);
      setTimeout(() => {
        setSizeErrorMessage(false);
      },3000)
    }
  }

  function getCrustPrice(crustType,pizzaSize,qty){

    let crust = crusts.find((crust) => crust.name === crustType);
    const price = crust.price[pizzaSize];
    const finalPrice = price*qty;
    return finalPrice;
  }

  return (
    <div className="container mt-3">

      <h2 className="pt-2">Veg Pizzas</h2>

      {showSpinner ? <div className="spinner-border text-danger mt-4" role="status"></div> : ""}

      {showMessage ? <div className="alert alert-primary" role="alert">
  Item added to cart!
</div> : ""}

{qtyErrorMessage ? <div className="alert alert-danger" role="alert">
  Quantity must be 1 or greater than 1
</div> : ""}

{sizeErrorMessage ? <div className="alert alert-danger" role="alert">
  Select a size (regular, medium, large) / selected size has already been added to the cart
</div> : ""}

      <div className="d-sm-flex flex-wrap justify-content-evenly gap-5 m-5 mt-2">
        {vegPizzas.map((pizza, index) => {

            //get the size keys
            const priceObj = pizza.price;
            const priceKeys = Object.keys(priceObj);
            
          return (
            <div className="card mt-4" key={index}>
              <img className="pizza-img" src={pizza.img} alt="veg pizza"></img>
              <div className="card-body">
                <div className="card-title text-start text-wrap">
                  {pizza.name}
                </div>
                <p className="card-text text-wrap text-start">{pizza.desc}</p>
                <hr />

              {!isAdmin ? <form>
                {/* pizza size */}
                <div className="d-flex flex-column size-and-crust gap-2">
                  <div className="d-flex gap-2">
              
                    {/* size radio buttons starts */}
                    {priceKeys.map((key,index) => {
                     return <div className="form-check d-flex gap-1" key={index} >
                      <input className="form-check-input" type="radio" name="pizzaSize" id={key} value={key} onChange={(e) =>{
                        let size = e.target.value;
                        setSelectedPizzaSize(size);
                      }}></input>
                      <div className="d-flex flex-column gap-1">
                      <label className="form-check-label" htmlFor={key}>{key}</label>
                      <div className="price">{`₹ ${priceObj[key]}`}</div>
                      </div>
                    </div>
                    })}
                    {/* size radio buttons ends */}
                  </div>

                  {/* crusts section starts */}
                  <div className="d-flex gap-3">
                  <div className="d-flex flex-column w-50">
                    <label className="crust-label text-danger text-start">Crust</label>
                  <select className="form-select crust-selection" id="crustSelection" aria-label="crust-selection" onChange={(e) => {setSelectedCrust(e.target.value)}}>
                    {crusts.map((crust,index) => {
                      return <option value={crust.name} key={index} className="crust-option">{crust.name}</option>
                    })}
                  </select>
                  </div>
                  {/* crust section ends */}
                  
                  {/* quantity section starts */}
                  <div className="d-flex flex-column w-25">
                    <label className="qty-label text-danger text-start">Qty</label>
                    <input type="number" className="form-control" name="quantity" id="quantity" onChange={(e) => {
                       setQty(e.target.value) ;
                       if(e.target.value < 1){
                        showAlert("Quantity");
                       }
                    }
                       }></input>
                  </div>
                  </div>
                  {/* quantity section ends */}
                </div>
            
                <div className="d-flex justify-content-end vertical-align-middle mt-4">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => {
                      if (!userLogged) {
                        navigate("/login");
                      } else {

                        //check if all values are selected starts
                        // if(selectedPizzaSize === "" || qty < 1){
                        //   showAlert("PizzaSize");
                        //   showAlert("Quantity");
                        // }
                        //check if all values are selected ends
                        if(selectedPizzaSize !== "" && qty >= 1)
                        {
                        selectedPizzaObj.name = pizza.name;
                        selectedPizzaObj.size = selectedPizzaSize;
                        selectedPizzaObj.price = priceObj[selectedPizzaSize];
                        selectedPizzaObj.crust = selectedCrust;
                        selectedPizzaObj.quantity = qty;
                        selectedPizzaObj.finalPrice = getCrustPrice(selectedCrust,selectedPizzaSize,qty);

                        dispatch(addToCart(selectedPizzaObj));
                        showAlert("AddedToCart");

                        //make the quantity and size to default
                        setSelectedPizzaSize("");
                        setQty(0);
                        // navigate("/userHomePage");
                        }

                        else if(selectedPizzaSize === ""){
                          showAlert("PizzaSize");
                        }

                        else if(qty < 1){
                          showAlert("Quantity");
                        }
                      }
                    }}
                  >
                    Add to cart 🍕
                  </button>
                </div>
              </form> : <div className="d-flex gap-2"> 
                <button type="button" className="btn btn-danger" onClick={() => navigate(`/editDetails/${pizza._id}`)}>Edit</button> 
                <button type="button" className="btn btn-danger" onClick={() => deleteItem(pizza._id)}>Delete</button> 
                </div> }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
