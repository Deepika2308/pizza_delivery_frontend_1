
import {useSelector,useDispatch} from "react-redux";
import {useEffect,useState} from "react";
import axios from 'axios';
import "./cart.css";
import {removeFromCart} from "../features/cart/cartSlice";
import {useFormik} from 'formik';
import * as yup from 'yup'
import {useNavigate} from 'react-router-dom';
import {SaveAddress} from '../components/saveAddress';
import io from 'socket.io-client';
import {changeNotification} from '../features/notifications/notificationSlice';
import {API} from "../global.js";
// import Razorpay from 'razorpay';

const socket = io.connect(`${API}`);

function initPayment(orderDetails,rzpKey,cartItems,branch,user,dispatch,navigate){
  
  const amount = parseInt(orderDetails.data.amount);

  const options={
     key:rzpKey,
     amount:amount,
     currency:"INR",
     name:"Pizza",
     description:"Pizza Payment",
     order_id:orderDetails.data.id,
     handler: async(response) => {
      //verify payment
      try{
        response.order_id=orderDetails.data.id;
        const verifyPayment = await axios.post(`${API}/order/verifyPayment`,response);
        //clear the cart and place the order details in order history through redux state
        if(verifyPayment.status === 200){

          const orderData = orderDetails.data;
          const date = new Date();

          const obj ={
            orderId:orderData.id,
            date: date.toString(),
            amount:orderData.amount,
            receipt:orderData.receipt,
            paymentId:response.razorpay_payment_id,
            name: `${user.result.first_name} ${user.result.last_name}`,
            email:user.result.email,
            orderItems:cartItems,
          }

           socket.emit("paymentVerified",obj);

           socket.on("OrderConfirmed", (msg)=>{
            if(msg){
              socket.emit("order_confirmed");

              let interval; 
          socket.on("notification_message",(data) => {
            dispatch(changeNotification(data.message));
            interval = setTimeout(emit_notification,10000,data.message);
          })
        
          function emit_notification(message){
            socket.emit(message);
            clearInterval(interval);
          }
            }
            else{
              dispatch(changeNotification("Order is not accepted"));
            }
           })

          

          //save the orders in database
          const saveOrder = await axios.post(`${API}/order/saveOrder`,obj);

          //remove items from cart after payment verification
          cartItems.map((item,index) => {
            dispatch(removeFromCart(item.id));
          })

          navigate("/orderHistory");
        }
      }
      catch(err){
        console.log(err);
      }
     },
    prefill:{
      name:`${user.result.first_name} ${user.result.last_name}`,
      email:user.result.email,
      contact:"9999999999"
    },
    notes:{
      address:"Razorpay test transaction",
    },
    theme:{
      color:"#3399cc",
    }
  }

  const rzpInstance = new window.Razorpay(options);
  rzpInstance.open();
}

async function showRazorpay(payload,rzpKey,cartItems,branch,user,dispatch,navigate){
  
  const ordersUrl = `${API}/order/createOrder`;
  const orderDetails = await axios.post(ordersUrl,payload);
  
  initPayment(orderDetails.data,rzpKey,cartItems,branch,user,dispatch,navigate);
  
}

export function Cart(){

  let[addressModal,setAddressModal] = useState(false);
  let[showSpinner,setShowSpinner] = useState(false);

  //get pizzas added to cart
    const cartItems = useSelector((state) => state.cart.cartPizzas);
    const branch = useSelector((state) => state.branch.branchName);
    const user = useSelector((state) =>  state.user.users);

    let [selectBranchMsg,setSelectBranchMsg] = useState(false);
    let [rzpKey,setRzpKey] = useState("");

    let checkoutPrice = 0;
    const dispatch = useDispatch();
    const navigate= useNavigate();

    const formValidation = yup.object({
      deliveryOption:yup.string().required("Required!"),
    })

    const {values,handleChange,handleSubmit,errors,touched} = useFormik({
      initialValues:{deliveryOption:""},
      validationSchema:formValidation,
      onSubmit :(values) =>{
        setShowSpinner(true);
        if(values.deliveryOption === "pickup" && branch === ""){
          setShowSpinner(false);
          setSelectBranchMsg(true);
          setTimeout(() => {
            setSelectBranchMsg(false);
          },2000);
        }
        else if(values.deliveryOption === "delivery"){
        if(!user.result.hasOwnProperty("address")){
          setShowSpinner(false);
          setAddressModal(true);
        }
        }

        let payload = {};
        payload.totalPrice = checkoutPrice;

        if(values.deliveryOption === "pickup" && branch !== "")
        {
          showRazorpay(payload,rzpKey,cartItems,branch,user,dispatch,navigate);
        }
        else if(values.deliveryOption === "delivery" && user.result.hasOwnProperty("address")){
          showRazorpay(payload,rzpKey,cartItems,branch,user,dispatch,navigate);
        }

      }
    })

    useEffect(() => {
        async function fetchRzpKey(){
          const key =await axios.get(`${API}/getKeyId`);
          const rzpKeyId = key.data.data;
          setRzpKey(rzpKeyId);
    }
    fetchRzpKey();
  },[])
    
    return(
      <div className="container">
        <div>
        {selectBranchMsg ? <div className="alert alert-danger">Please select the nearest branch</div> :""}
        </div>

        <div className="d-flex flex-wrap">
        <div className="d-sm-flex flex-wrap justify-content-evenly gap-5 m-5 mt-4 w-50">
            {cartItems.map((item,index) => {
              checkoutPrice +=item.finalPrice;
                return <div className="card mt-4" key={index}>
                <div className="card-body d-flex flex-column gap-2">
                  <div className="card-title text-start text-wrap text-danger">
                    {item.name}
                  </div>
                  <div className="pizza-size text-start">
                    {item.size}
                  </div>
                  <div className="pizza-crust text-start">
                    {item.crust}
                  </div>
                  <div className="pizza-quantity text-start">
                    {`Qty : ${item.quantity}`}
                  </div>

                  <div className="cart-card-footer d-flex justify-content-between mt-3">
                    <button className="btn btn-sm btn-danger" onClick={() => dispatch(removeFromCart(item.id))}>Delete</button>
                    <div className="item-total d-flex align-items-center">{`₹ ${item.finalPrice}`}</div>
                  </div>
                  
                </div>
               </div>   
            })}
        </div>

        {/* right section starts */}
        <div className="checkout-div bg-danger  w-25 h-50 py-3 mt-5">
        <form className="checkout-section" onSubmit={handleSubmit}>
          <div className="text-light totalPrice">
            {`Total : ₹ ${checkoutPrice}`}
          </div>
          <div className="delivery-option d-flex gap-2 justify-content-center mt-3">
            <div className="d-flex gap-1">
            <input className="form-check-input" type="radio" name="deliveryOption" id="delivery" value="delivery" onChange={handleChange}></input>
            <label htmlFor="delivery" className="text-light">Delivery</label>
            </div>
            
            <div className="d-flex gap-1"> 
            <input className="form-check-input" type="radio" name="deliveryOption" id="pickup" value="pickup" onChange={handleChange}></input>
            <label htmlFor="pickup" className="text-light">Pickup</label>
            </div>
          </div> 

          {errors.deliveryOption && touched.deliveryOption ? <div className="text-white">{errors.deliveryOption}</div> : ""}
          <div className="d-flex flex-column gap-2">
          <button className="btn btn-sm btn-light mt-3 m-auto" type="submit">Make payment</button>
          {showSpinner ? <div className="spinner-border text-light mt-3 m-auto" role="status"></div> :""}
          </div>
        </form>
        </div>
        {/* right section ends */}
        </div>

        {/* display address page to enter address */}
        {addressModal ? <SaveAddress show={addressModal} setShow={setAddressModal} user={user.result.email} /> : ""}

        </div>
    )
}